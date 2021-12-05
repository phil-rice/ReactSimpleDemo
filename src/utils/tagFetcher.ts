import {Lens, Optional} from "@focuson/lens";
import {areAllDefined, arraysEqual, Fetcher, loadInfo, MutateFn, partialFnUsageError, ReqFn, Tags} from "@focuson/fetcher";
import {or} from "./utils";
import {PageSelection} from "../components/multipage/multiPage.domain";


/** The tags are the 'bits of data' that tell us if we need to load something'
 * For example a statement needs a customer id. If the customer id changes then we need to fetch the statement data again
 */
export interface TagHolder {
    [name: string]: Tags
}

type  OnTagFetchErrorFn<S> = (s: S, status: number, req: any, response: any, originalTags?: Tags, currentTags?: Tags) => S

export function onTagFetchError<S>(errorMessageL: Optional<S, string>): OnTagFetchErrorFn<S> {
    return (s: S, status: number, req: any, response: any, originalTags?: Tags, currentTags?: Tags) =>
        errorMessageL.set(s, `Req: ${JSON.stringify(req).replaceAll('"', "'")}, Resp: ${response}, ${status}, ${originalTags}, ${currentTags}`);
}


export interface CommonTagFetcher<S> {
    tagHolderLens: Optional<S, TagHolder>,
    onTagFetchError: OnTagFetchErrorFn<S>
}
export interface SpecificTagFetcher<S, T> extends CommonTagFetcher<S> {
    targetLens: Optional<S, T>,
    actualTags: (s: S) => Tags,
    reqFn: ReqFn<S>,
    tagLens: Optional<S, Tags>,
    description?: string
}
export function specify<S, T>(ctf: CommonTagFetcher<S>, tagName: string, actualTags: (s: S) => Tags, reqFn: ReqFn<S>, targetLens: Optional<S, T>, description?: string): SpecificTagFetcher<S, T> {

    return ({
        ...ctf,
        targetLens,
        actualTags,
        reqFn,
        tagLens: ctf.tagHolderLens.focusQuery(tagName),
        description: tagName
    })
}


export function tagFetcher<S, T>(sf: SpecificTagFetcher<S, T>): Fetcher<S, T> {
    const result: Fetcher<S, T> = {
        shouldLoad(s: S) {
            const currentTags = sf.tagLens.getOption(s)
            let desiredTags = sf.actualTags(s);
            return areAllDefined(desiredTags) && (!arraysEqual(desiredTags, currentTags) || sf.targetLens.getOption(s) === undefined)
        },
        load(s: S) {
            const currentTags = sf.actualTags(s)
            if (!areAllDefined(currentTags)) throw partialFnUsageError(result)
            const req = sf.reqFn(s);
            if (!req) throw partialFnUsageError(result)
            const [url, info] = req
            const mutateForHolder: MutateFn<S, T> = state => (status, json) => {
                if (!state) throw partialFnUsageError(result)
                const tagAndTargetLens = sf.tagLens.combine(sf.targetLens)
                return status < 300 ? tagAndTargetLens.set(state, [currentTags, json]) : sf.tagLens.set(sf.onTagFetchError(s, status, req, json, sf.tagLens.getOption(s), currentTags), currentTags)
            }
            return loadInfo(url, info, mutateForHolder);
        },
        description: or(() => `tagFetcher(${sf.tagLens.description},${sf.targetLens.description})`)(sf.description)
    }
    return result;
}
