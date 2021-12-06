import {Lenses} from "@focuson/lens";
import {TagHolder} from "../../utils/tagFetcher";
import {HasPageSelection} from "../../components/multipage/multiPage.domain";
import {FetcherDebug} from "@focuson/fetcher";
import {HasStatement} from "../statement/statementPage";
import {HasStatement2x2} from "../statement/statementPage2x2";


export interface FullState extends HasStatement, HasStatement2x2, HasCustomerId, HasPageSelection<any>, HasTagHolder {
    fetcherDebug?: FetcherDebug
    showPageDebug?: boolean
}

export const fullStateIdentityL = Lenses.identity<FullState>('state')

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
