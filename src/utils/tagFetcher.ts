import {Iso, Lens, Optional} from "@focuson/lens";
import {areAllDefined, arraysEqual, Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, partialFnUsageError, ReqFn, Tags} from "@focuson/fetcher";
import {or} from "./utils";


/** The tags are the 'bits of data' that tell us if we need to load something'
 * For example a statement needs a customer id. If the customer id changes then we need to fetch the statement data again
 */
export interface TagHolder {
    [name: string]: Tags
}

type  OnTagFetchErrorFn<S> = (s: S, status: number, req: any, response: any, originalTags?: Tags, currentTags?: Tags) => S

export function onTagFetchError<S>(errorMessageL: Optional<S, string>): OnTagFetchErrorFn<S> {
    return (s: S, status: number, req: any, response: any, originalTags?: Tags, currentTags?: Tags) =>
        errorMessageL.set(s, `Req: ${JSON.stringify(req)}, Resp: ${JSON.stringify(response)}, ${status}, ${originalTags}, ${currentTags}`);
}


export interface CommonTagFetcher<S, Details> {
    identityL: Iso<S, S>,
    mainThingL: Lens<S, keyof Details>,
    tagHolderL: Optional<S, TagHolder>,
    onTagFetchError: OnTagFetchErrorFn<S>
}
export interface SpecificTagFetcher<S, Details, T> extends CommonTagFetcher<S, Details> {
    targetLens: Optional<S, T>,
    actualTags: (s: S) => Tags,
    reqFn: ReqFn<S>,
    tagLens: Optional<S, Tags>,
    description?: string
}
export function specify<S, Details, T>(ctf: CommonTagFetcher<S, Details>, tagName: keyof S, actualTags: (s: S) => Tags, reqFn: ReqFn<S>, targetLens: Optional<S, T>, description?: string): SpecificTagFetcher<S, Details, T> {
    return ({
        ...ctf,
        targetLens,
        actualTags,
        reqFn,
        // @ts-ignore  We need this ignore here to avoid the effort of setting up Tag properly. This reduces the work of every page, so I think it's worth it
        tagLens: ctf.tagHolderL.focusQuery(tagName),
        description: tagName.toString()
    })
}


//  return ifEEqualsFetcher(s => (customerIdL.getOption(s) !== undefined && (mainThingL.get(s).pageName === 'statement'||mainThingL.get(s).pageName === 'statement2x2')),
//         tagFetcher<S, Statement>(statementSF<S>(customerIdL)))

export function simpleTagFetcher<S, Details, K extends keyof S>(ctf: CommonTagFetcher<S, Details>, tagName: K, actualTags: (s: S) => Tags, reqFn: ReqFn<S>, description?: string) {
    const stf = specify<S, Details, S[K]>(ctf, tagName, actualTags, reqFn, ctf.identityL.focusQuery(tagName))
    ifEEqualsFetcher<S>(s => ctf.mainThingL.get(s) === tagName.toString(), tagFetcher(stf), description)
}


export function tagFetcher<S, Details, T>(sf: SpecificTagFetcher<S, Details, T>): Fetcher<S, T> {
    const result: Fetcher<S, T> = {
        shouldLoad(s: S) {
            const currentTags = sf.tagLens.getOption(s)
            let desiredTags = sf.actualTags(s);
            // console.log('tagFetcher.tags', currentTags, desiredTags)
            // console.log('tagFetcher.areAllDefined(desiredTags)', areAllDefined(desiredTags))
            // console.log('tagFetcher.arraysEqual', arraysEqual(desiredTags, currentTags))
            // console.log('tagFetcher.undefined', sf.targetLens.getOption(s) === undefined)
            let result = areAllDefined(desiredTags) && (!arraysEqual(desiredTags, currentTags) || sf.targetLens.getOption(s) === undefined);
            // console.log('tagFetcher.result',result)
            return result
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
