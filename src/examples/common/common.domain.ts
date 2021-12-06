import {Iso, Lenses, Optional} from "@focuson/lens";
import {CommonTagFetcher, onTagFetchError, SpecificTagFetcher, tagFetcher, TagHolder} from "../../utils/tagFetcher";
import {HasPageSelection} from "../../components/multipage/multiPage.domain";
import {ifEEqualsFetcher, ReqFn, Tags} from "@focuson/fetcher";

//    identityL: Iso<S, S>,
//     mainThingL: Lens<S, string>,
//     tagHolderL: Optional<S, TagHolder>,
//     onTagFetchError: OnTagFetchErrorFn<S>

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

export interface HasCustomerId {
    customerId?: string
}

export const customerIdL = Lenses.identity<HasCustomerId>('hasCustomerid').focusQuery('customerId')

/** The tag holder holds all the tags for all the pages. Each page that needs a tagFetcher will have a name and its tags will be stored here*/
export interface HasTagHolder {
    tags: TagHolder
}
export interface HasErrorMessage {
    errorMessage?: string
}
