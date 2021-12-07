import {statementFetcher} from "../statement/statementPage";
import { FullState} from "../common/common.domain";
import {pageSelectionlens} from "../../components/multipage/multiPage.domain";
import {statement2x2Fetcher} from "../statement/statementPage2x2";
import {FetcherTree} from "@focuson/fetcher";
import {customerIdL} from "./customerId";


const sFetcher = statementFetcher<FullState>(pageSelectionlens(), customerIdL)
const s2x2Fetcher = statement2x2Fetcher<FullState>(pageSelectionlens(), customerIdL)

export const tree: FetcherTree<FullState> = {fetchers: [sFetcher, s2x2Fetcher], children: []}

