import {sampleStatement} from "./sampleStatement";
import {provider} from "../../utils/provider";
import {stateStatementL, HasStatement, statementFetcher, statementUrl} from "./statement.domain";
import {fetcherTree, loadTree, loggingFetchFn, wouldLoad} from "@focuson/fetcher";

import {customerIdL, HasCustomerId} from "../common/common.domain";
import {fetchWithPrefix} from "../../utils/utils";
import {HasPageSelection, pageSelectionlens} from "../../components/multipage/multiPage.domain";

export interface StateForStatement extends HasStatement, HasCustomerId, HasPageSelection<any> {

}

const emptyState: StateForStatement = {
    pageSelection: {pageName: 'empty'}
}
const emptyStatementState: StateForStatement = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid"
}

const sFetcher = statementFetcher<StateForStatement>(pageSelectionlens(), customerIdL, stateStatementL())
const statementFetcherTree = fetcherTree<StateForStatement>(sFetcher)


describe("statement fetcher unit tests", () => {

    it("should have a url based on the customer id", () => {
        expect(() => statementUrl(customerIdL)(emptyState)).toThrow("cannot get statementUrl without customerId")
        expect(statementUrl(customerIdL)(emptyStatementState)).toEqual("/statement/mycid")
    })

    it("shouldn't load data unless mainthing is selected", () => {
        expect(wouldLoad(statementFetcherTree, emptyState)).toEqual([{fetcher: sFetcher, load: false}])
    })

    it("retrieves statement data the backend when main thing is selected and not loaded", async () => {
        expect(wouldLoad(statementFetcherTree, emptyStatementState)).toEqual([
            {fetcher: sFetcher, load: true, reqData: ["/statement/mycid", undefined, false]}
        ])
    })
    it("doesnt retrieve statement data the backend when main thing is selected and  loaded", async () => {
        expect(wouldLoad(statementFetcherTree, {...emptyStatementState, statement: sampleStatement})).toEqual([{fetcher: sFetcher, load: false}])
    })
})

beforeAll(async () => {
    await provider
        // (2) Start the mock server
        .setup()
        // (3) add interactions to the Mock Server, as many as required
        .then(() =>
            provider.addInteraction({
                state: "I have a statement",
                uponReceiving: "a request for a statement",
                withRequest: {
                    method: "GET",
                    path: "/statement/mycid"
                },
                willRespondWith: {
                    status: 200,
                    body: sampleStatement
                },
            }))
})

afterAll(() => {
    provider.finalize()
})


describe("reading statement details", () => {
        it("should fetch statement data when needed and add it to the state", async () => {
            let newState = await loadTree(statementFetcherTree, emptyStatementState, fetchWithPrefix("http://localhost:1234", loggingFetchFn), {})
            expect(newState).toEqual({...emptyStatementState, statement: sampleStatement})
        })
    }
)