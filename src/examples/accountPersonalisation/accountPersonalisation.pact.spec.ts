import {accountPersonalisationUrl, HasAccountPersonalisationDomain} from "./accountPersonalisation.domain";
import {HasPageSelection, pageSelectionlens} from "../../components/multipage/multiPage.domain";
import {customerIdL, HasCustomerId} from "../index/customerId";
import {HasTagHolder} from "../common/common.domain";
import {accountPersonalisationFetcher, AccountPersonalisationRequirements} from "./accountPersonalisation";
import {fetcherTree, loadTree, loggingFetchFn, wouldLoad} from "@focuson/fetcher";
import {sampleAccountPersonalisation} from "./sampleAccountPersonalisation";
import {provider} from "../../utils/provider";
import wrapper from "@pact-foundation/pact-node";
import {fetchWithPrefix} from "../../utils/utils";


export interface AcountPersonalisationForTest extends AccountPersonalisationRequirements, HasPageSelection<any> {
}

const emptyState: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'empty'},
    tags: {}
}
const emptyStateWithCustomerId: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "123",
    tags: {}
}
const withWrongStatementTags: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "123",
    tags: {accountPersonalisation: ["wrong"]},
    accountPersonalisation: sampleAccountPersonalisation
}
const withCorrectStatementTags: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "123",
    tags: {accountPersonalisation: ["123"]},
    accountPersonalisation: sampleAccountPersonalisation
}

const apFetcher = accountPersonalisationFetcher<AcountPersonalisationForTest>(pageSelectionlens(), customerIdL)
const apFetcherTree = fetcherTree<AcountPersonalisationForTest>(apFetcher)


describe("statement fetcher unit tests", () => {

    it("should have a url based on the customer id", () => {
        expect(() => accountPersonalisationUrl(customerIdL)(emptyState)).toThrow("cannot get accountPersonalisationUrl without customerId")
        expect(accountPersonalisationUrl(customerIdL)(emptyStateWithCustomerId)).toEqual("/accountPersonalisation/123")
    })

    it("shouldn't load data unless mainthing is selected", () => {
        expect(wouldLoad(apFetcherTree, emptyState)).toEqual([{fetcher: apFetcher, load: false}])
    })

    it("retrieves statement data the backend when main thing is selected and not loaded", async () => {
        expect(wouldLoad(apFetcherTree, emptyStateWithCustomerId)).toEqual([
            {fetcher: apFetcher, load: true, reqData: ["/accountPersonalisation/123", undefined, false]}
        ])
    })
    it("retrieves statement data the backend when main thing is selected but has wrong tags", async () => {
        expect(wouldLoad(apFetcherTree, withWrongStatementTags)).toEqual([
            {fetcher: apFetcher, load: true, reqData: ["/accountPersonalisation/123", undefined, false]}
        ])
    })
    it("doesnt retrieve statement data the backend when main thing is selected and has correct tags", async () => {
        expect(wouldLoad(apFetcherTree, withCorrectStatementTags)).toEqual([{fetcher: apFetcher, load: false}])
    })
})

async function setUp() {
    return await provider
        // (2) Start the mock server
        .setup()
        // (3) add interactions to the Mock Server, as many as required
        .then(async () => {
            await provider.addInteraction({
                state: "I have a new account personalisation ",
                uponReceiving: "a request for a account personalisation '123'",
                withRequest: {
                    method: "GET",
                    path: "/accountPersonalisation/123"
                },
                willRespondWith: {
                    status: 200,
                    body: sampleAccountPersonalisation
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
            let newState = await loadTree(apFetcherTree, emptyStateWithCustomerId, fetchWithPrefix("http://localhost:1234", loggingFetchFn), {})
            expect(newState).toEqual({...emptyStateWithCustomerId, accountPersonalisation: sampleAccountPersonalisation, tags: {accountPersonalisation: ["123"]}})

        })
    }
)