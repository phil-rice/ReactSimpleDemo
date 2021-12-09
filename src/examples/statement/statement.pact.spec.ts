import {sampleStatement} from "./statement.sample";
import {statementUrl} from "./statement.domain";
import {fetcherTree, loadTree, loggingFetchFn, wouldLoad} from "@focuson/fetcher";
import {HasPageSelection, pageSelectionlens} from "../../components/multipage/multiPage.domain";
import {fetchWithPrefix} from "../../utils/utils";
import {statementFetcher, StatementRequirements} from "./statement";
import {Statement2x2Requirements} from "./statementPage2x2";
import {customerIdL, HasCustomerId} from "../index/customerId";
import {pactWith} from "jest-pact";

export interface StateForStatementTest extends StatementRequirements, HasPageSelection<any>, HasCustomerId {
}
export interface StateForStatement2x2Test extends Statement2x2Requirements, HasPageSelection<any> {
}

const emptyState: StateForStatementTest = {
    pageSelection: {pageName: 'empty'},
    tags: {}
}
const emptyStatementState: StateForStatementTest = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    tags: {}
}
const withWrongStatementTags: StateForStatementTest = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    statement: {...sampleStatement, title: 'old title that will be changed'},
    tags: {statement: ["wrongTags"]}
}
const withCorrectStatementTags: StateForStatementTest = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    statement: sampleStatement,
    tags: {statement: ["mycid"]}
}

const sFetcher = statementFetcher<StateForStatementTest>(pageSelectionlens(), customerIdL)
const statementFetcherTree = fetcherTree<StateForStatementTest>(sFetcher)


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
pactWith({consumer: 'Statement', provider: 'StatementApi', cors: true}, provider => {
    beforeEach(async () => {


        }
    )

    describe("reading statement details", () => {

        it("should fetch statement data when needed and add it to the state", async () => {
            await provider.addInteraction({
                state: "I have 1 statement 'mycid2'",
                uponReceiving: "a request for a statement",
                withRequest: {
                    method: "GET",
                    path: "/statement/mycid"
                },
                willRespondWith: {
                    status: 200,
                    body: sampleStatement
                },
            })
            let newState = await loadTree(statementFetcherTree, emptyStatementState, fetchWithPrefix(provider.mockService.baseUrl, loggingFetchFn), {})
            expect(newState).toEqual({...emptyStatementState, statement: sampleStatement, tags: {statement: ["mycid"]}})
        })
    })

    describe("a second pact for statement", () => {
            it("should fetch different statement data when needed and add it to the state", async () => {
                await provider.addInteraction({
                    state: "I have a new statement 2",
                    uponReceiving: "a request for a statement 'mycid'",
                    withRequest: {
                        method: "GET",
                        path: "/statement/mycid2"
                    },
                    willRespondWith: {
                        status: 200,
                        body: {...sampleStatement, title: "Second"}
                    },
                })
                let newState = await loadTree(statementFetcherTree, {...emptyStatementState, customerId: 'mycid2'}, fetchWithPrefix(provider.mockService.baseUrl, loggingFetchFn), {})
                expect(newState).toEqual({...emptyStatementState, customerId: 'mycid2', statement: {...sampleStatement, title: 'Second'}, tags: {statement: ["mycid2"]}})
            })
        }
    )
})