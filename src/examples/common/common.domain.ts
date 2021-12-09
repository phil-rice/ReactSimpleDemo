import {Lenses} from "@focuson/lens";
import {TagHolder} from "../../utils/tagFetcher";
import {HasPageSelection} from "../../components/multipage/multiPage.domain";
import {FetcherDebug} from "@focuson/fetcher";
import {HasStatement} from "../statement/statement";
import {HasStatement2x2} from "../statement/statementPage2x2";
import {HasShowPageDebug} from "../../components/demo/selectPages";
import {HasCustomerId} from "../index/customerId";
import {HasAccountPersonalisationDomain} from "../accountPersonalisation/accountPersonalisation.domain";


export interface FullDetails extends HasStatement, HasStatement2x2, HasAccountPersonalisationDomain{

}

export interface FullState extends FullDetails, HasPageSelection<any>, HasTagHolder, HasShowPageDebug, HasCustomerId {
    fetcherDebug?: FetcherDebug
    showPageDebug?: boolean,
    stateDebug?: boolean
}

export const fullStateIdentityL = Lenses.identity<FullState>('state')


/** The tag holder holds all the tags for all the pages. Each page that needs a tagFetcher will have a name and its tags will be stored here*/
export interface HasTagHolder {
    tags: TagHolder
}
export interface HasErrorMessage {
    errorMessage?: string
}
