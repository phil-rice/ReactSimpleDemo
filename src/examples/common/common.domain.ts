import {Lenses,Iso} from "@focuson/lens";
import {CommonTagFetcher, onTagFetchError, TagHolder} from "../../utils/tagFetcher";

export function commonFetch<S extends HasErrorMessage & HasTagHolder>(): CommonTagFetcher<S> {
    const identity: Iso<S, any> = Lenses.identity<S>('state')//we need the any because of a typescript compiler bug
    return ({
        tagHolderLens: identity.focusQuery('tags'),
        onTagFetchError: onTagFetchError(identity.focusQuery('errorMessage'))
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
