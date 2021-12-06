import {Lenses, Iso, Optional} from "@focuson/lens";
import {CommonTagFetcher, onTagFetchError, TagHolder} from "../../utils/tagFetcher";
import {HasPageSelection} from "../../components/multipage/multiPage.domain";

//    identityL: Iso<S, S>,
//     mainThingL: Lens<S, string>,
//     tagHolderL: Optional<S, TagHolder>,
//     onTagFetchError: OnTagFetchErrorFn<S>

export function commonFetch<S extends HasErrorMessage & HasTagHolder & HasPageSelection<Details>, Details>(): CommonTagFetcher<S, Details> {
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
