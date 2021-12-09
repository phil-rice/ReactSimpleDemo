import {statementFetcher} from "./examples/statement/statement";
import {FullState} from "./examples/common/common.domain";
import {pageSelectionlens} from "./components/multipage/multiPage.domain";
import {statement2x2Fetcher} from "./examples/statement/statementPage2x2";
import {FetcherTree} from "@focuson/fetcher";
import {customerIdL} from "./examples/index/customerId";
import {accountPersonalisationFetcher} from "./examples/accountPersonalisation/accountPersonalisation";


const sFetcher = statementFetcher<FullState>(pageSelectionlens(), customerIdL)
const s2x2Fetcher = statement2x2Fetcher<FullState>(pageSelectionlens(), customerIdL)
const apFetcher = accountPersonalisationFetcher<FullState>(pageSelectionlens(), customerIdL)

export const tree: FetcherTree<FullState> = {fetchers: [sFetcher, s2x2Fetcher, apFetcher], children: []}

