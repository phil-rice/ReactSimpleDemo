import {Iso, Lens, Lenses, Optional} from "@focuson/lens";
import {areAllDefined, arraysEqual, Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, partialFnUsageError, ReqFn, Tags} from "@focuson/fetcher";
import {or} from "./utils";
import {HasErrorMessage, HasTagHolder} from "../examples/common/common.domain";
import {HasPageSelection} from "../components/multipage/multiPage.domain";


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


/**S is the full state for our application.
 *
 * Details is things like {statement: Statement, accountPersonalisation: AccountPersonalisation} the data we load from the back end goes here
 */
export interface CommonTagFetcher<S extends Details, Details> {
    identityL: Iso<S, S>, //An identity lens. Just avoid remaking it
    mainThingL: Lens<S, keyof Details>,  //the name of the main thing being displayed. e.g. statement, accountpersonalisation...
    tagHolderL: Optional<S, TagHolder>,  //focuses on the tags that record 'the current state' i.e. the ones that were last loaded
    onTagFetchError: OnTagFetchErrorFn<S>, //What to do if there is a problem while fetching

}

/**S is the state. Details are where we put the resulting data that we fetch (typically a unique place per item fetched), T is the type this fetcher will fetch */
export interface SpecificTagFetcher<S extends Details, Details, T> extends CommonTagFetcher<S, Details> {
    tagFetcher(sf: SpecificTagFetcher<S, Details, T>): Fetcher<S, T>,
    targetLens: Optional<S, T>,  //where we put the T
    actualTags: (s: S) => Tags, // the tags that say 'if any of these change we need to reload'
    reqFn: ReqFn<S>, // The url and other things needed to load the data
    tagLens: Optional<S, Tags>, //A lens to where we store the tags. Will typically be under the targetHolderL of the CommonTagFetcher
    description?: string
}


export function commonFetch<S extends HasErrorMessage & HasTagHolder & HasPageSelection<Details> & Details, Details>(): CommonTagFetcher<S, Details> {
    const identityL: Iso<S, S> = Lenses.identity<S>('state')//we need the any because of a typescript compiler bug
    // @ts-ignore I don't know why this doesn't compile
    let errorMessageL: Optional<S, string> = identityL.focusQuery('errorMessage');
    return ({
        identityL,
        mainThingL: identityL.focusOn('pageSelection').focusOn('pageName'),
        tagHolderL: identityL.focusQuery('tags'),
        onTagFetchError: onTagFetchError(errorMessageL)
    })
}

export function simpleTagFetcher<S extends Details, Details, K extends keyof Details>(ctf: CommonTagFetcher<S, Details>, tagName: K, actualTags: (s: S) => Tags, reqFn: ReqFn<S>, description?: string) {
    const stf = specify<S, Details, S[K]>(ctf, tagName, actualTags, reqFn, ctf.identityL.focusQuery(tagName))
    return ifEEqualsFetcher<S>(s => ctf.mainThingL.get(s) === tagName.toString(), tagFetcher(stf), description)
}

export function specify<S extends Details, Details, T>(ctf: CommonTagFetcher<S, Details>, tagName: keyof S, actualTags: (s: S) => Tags, reqFn: ReqFn<S>, targetLens: Optional<S, T>, description?: string): SpecificTagFetcher<S, Details, T> {
    return ({
        ...ctf,
        tagFetcher,
        targetLens,
        actualTags,
        reqFn,
        // @ts-ignore  We need this ignore here to avoid the effort of setting up Tag properly. This reduces the work of every page, so I think it's worth it
        tagLens: ctf.tagHolderL.focusQuery(tagName),
        description: tagName.toString()
    })
}

export function tagFetcher<S extends Details, Details, T>(sf: SpecificTagFetcher<S, Details, T>): Fetcher<S, T> {
    const result: Fetcher<S, T> = {
        shouldLoad(s: S) {
            const currentTags = sf.tagLens.getOption(s)
            let desiredTags = sf.actualTags(s);
            let result = areAllDefined(desiredTags) && (!arraysEqual(desiredTags, currentTags) || sf.targetLens.getOption(s) === undefined);
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
