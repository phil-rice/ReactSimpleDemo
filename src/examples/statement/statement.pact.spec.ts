import {sampleStatement} from "./sampleStatement";
import {provider} from "../../utils/provider";
import {statementFetcher, StatementRequirements, statementUrl} from "./statement.domain";
import {fetcherTree, loadTree, loggingFetchFn, wouldLoad} from "@focuson/fetcher";
import wrapper from "@pact-foundation/pact-node"
import {customerIdL} from "../common/common.domain";
import {HasPageSelection, pageSelectionlens} from "../../components/multipage/multiPage.domain";
import {fetchWithPrefix} from "../../utils/utils";

export interface StateForStatement extends StatementRequirements, HasPageSelection<any> {

}

const emptyState: StateForStatement = {
    pageSelection: {pageName: 'empty'},
    tags: {}
}
const emptyStatementState: StateForStatement = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    tags: {}
}
const withWrongStatementTags: StateForStatement = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    statement: {...sampleStatement, title: 'old title that will be changed'},
    tags: {statement: ["wrongTags"]}
}
const withCorrectStatementTags: StateForStatement = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    statement: sampleStatement,
    tags: {statement: ["mycid"]}
}

const sFetcher = statementFetcher<StateForStatement>(pageSelectionlens(), customerIdL)
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
    it("retrieves statement data the backend when main thing is selected but has wrong tags", async () => {
        expect(wouldLoad(statementFetcherTree, withWrongStatementTags)).toEqual([
            {fetcher: sFetcher, load: true, reqData: ["/statement/mycid", undefined, false]}
        ])
    })
    it("doesnt retrieve statement data the backend when main thing is selected and has correct tags", async () => {
        expect(wouldLoad(statementFetcherTree, withCorrectStatementTags)).toEqual([{fetcher: sFetcher, load: false}])
    })
})

async function setUp() {
    return await provider
        // (2) Start the mock server
        .setup()
        // (3) add interactions to the Mock Server, as many as required
        .then(async () => {
            await provider.addInteraction({
                state: "I have 1 statement 'mycid2'",
                uponReceiving: "a request for a statement",
                withRequest: {
                    method: "GET",
                    path: "/statement/mycid2"
                },
                willRespondWith: {
                    status: 200,
                    body: {...sampleStatement, title: "Second"}
                },
            })
            await provider.addInteraction({
                state: "I have a new statement 2",
                uponReceiving: "a request for a statement 'mycid'",
                withRequest: {
                    method: "GET",
                    path: "/statement/mycid"
                },
                willRespondWith: {
                    status: 200,
                    body: sampleStatement
                },
            })
        })

}

beforeAll(async () => {
        process.on("SIGINT", () => {
            wrapper.removeAllServers()
        })
        return setUp()
    }
)
afterAll(async () => {
        await provider.finalize()
        wrapper.removeAllServers()
    }
)
describe("reading statement details", () => {

        it("should fetch statement data when needed and add it to the state", async () => {
            let newState = await loadTree(statementFetcherTree, emptyStatementState, fetchWithPrefix("http://localhost:1234", loggingFetchFn), {})
            expect(newState).toEqual({...emptyStatementState, statement: sampleStatement, tags: {statement: ["mycid"]}})

        })
        it("should fetch different statement data when needed and add it to the state", async () => {
            let newState = await loadTree(statementFetcherTree, {...emptyStatementState, customerId: 'mycid2'}, fetchWithPrefix("http://localhost:1234", loggingFetchFn), {})
            expect(newState).toEqual({...emptyStatementState, customerId: 'mycid2', statement: {...sampleStatement, title: 'Second'}, tags: {statement: ["mycid2"]}})
        })
    }
)