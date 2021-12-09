import {accountPersonalisationUrl} from "./accountPersonalisation.domain";
import {HasPageSelection, pageSelectionlens} from "../../components/multipage/multiPage.domain";
import {customerIdL} from "../index/customerId";
import {accountPersonalisationFetcher, AccountPersonalisationRequirements} from "./accountPersonalisation";
import {fetcherTree, loadTree, loggingFetchFn, wouldLoad} from "@focuson/fetcher";
import {sampleAccountPersonalisation} from "./sampleAccountPersonalisation";
import {provider} from "../../utils/provider";
import {fetchWithPrefix} from "../../utils/utils";
import {pactWith} from "jest-pact";


export interface AcountPersonalisationForTest extends AccountPersonalisationRequirements, HasPageSelection<any> {
}

const emptyState: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'empty'},
    tags: {}
}
const emptyStateWithCustomerId: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "mycid",
    tags: {}
}
const withWrongStatementTags: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "mycid",
    tags: {accountPersonalisation: ["wrong"]},
    accountPersonalisation: sampleAccountPersonalisation
}
const withCorrectStatementTags: AcountPersonalisationForTest = {
    pageSelection: {pageName: 'accountPersonalisation'},
    customerId: "mycid",
    tags: {accountPersonalisation: ["mycid"]},
    accountPersonalisation: sampleAccountPersonalisation
}

const apFetcher = accountPersonalisationFetcher<AcountPersonalisationForTest>(pageSelectionlens(), customerIdL)
const apFetcherTree = fetcherTree<AcountPersonalisationForTest>(apFetcher)


describe("statement fetcher unit tests", () => {

    it("should have a url based on the customer id", () => {
        expect(() => accountPersonalisationUrl(customerIdL)(emptyState)).toThrow("cannot get accountPersonalisationUrl without customerId")
        expect(accountPersonalisationUrl(customerIdL)(emptyStateWithCustomerId)).toEqual("/accountPersonalisation/mycid")
    })

    it("shouldn't load data unless mainthing is selected", () => {
        expect(wouldLoad(apFetcherTree, emptyState)).toEqual([{fetcher: apFetcher, load: false}])
    })

    it("retrieves statement data the backend when main thing is selected and not loaded", async () => {
        expect(wouldLoad(apFetcherTree, emptyStateWithCustomerId)).toEqual([
            {fetcher: apFetcher, load: true, reqData: ["/accountPersonalisation/mycid", undefined, false]}
        ])
    })
    it("retrieves statement data the backend when main thing is selected but has wrong tags", async () => {
        expect(wouldLoad(apFetcherTree, withWrongStatementTags)).toEqual([
            {fetcher: apFetcher, load: true, reqData: ["/accountPersonalisation/mycid", undefined, false]}
        ])
    })
    it("doesnt retrieve statement data the backend when main thing is selected and has correct tags", async () => {
        expect(wouldLoad(apFetcherTree, withCorrectStatementTags)).toEqual([{fetcher: apFetcher, load: false}])
    })
})
pactWith({consumer: 'AccountPersonalisation', provider: 'AccountPersonalisationApi', cors: true}, provider => {
    beforeAll(async () =>
        await provider.addInteraction({
            state: "I have a new account personalisation ",
            uponReceiving: "a request for a account personalisation 'mycid'",
            withRequest: {
                method: "GET",
                path: "/accountPersonalisation/mycid"
            },
            willRespondWith: {
                status: 200,
                body: sampleAccountPersonalisation
            },

        }))
    describe("reading statement details", () => {

            it("should fetch statement data when needed and add it to the state", async () => {
                let newState = await loadTree(apFetcherTree, emptyStateWithCustomerId, fetchWithPrefix(provider.mockService.baseUrl, loggingFetchFn), {})
                expect(newState).toEqual({...emptyStateWithCustomerId, accountPersonalisation: sampleAccountPersonalisation, tags: {accountPersonalisation: ["mycid"]}})
            })
        }
    )
})