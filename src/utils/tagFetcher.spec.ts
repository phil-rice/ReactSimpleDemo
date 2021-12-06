import {SpecificTagFetcher,  tagFetcher, TagHolder} from "./tagFetcher";
import {Lenses} from "@focuson/lens";
import {LoadInfo, MutateFn} from "@focuson/fetcher";
import {commonFetch, specify} from "../examples/common/common.domain";
import {HasPageSelection} from "../components/multipage/multiPage.domain";

interface TagFetcherDetails {
    target?: string,

}
interface TagFetcherTestState extends TagFetcherDetails, HasPageSelection<TagFetcherDetails> {
    tag1?: string,
    tag2?: string,
    tags: TagHolder,
    errorMessage?: string
}


const tagFetcherTestStateL = Lenses.identity<TagFetcherTestState>('state')
const fetcherSF: SpecificTagFetcher<TagFetcherTestState, TagFetcherDetails, string> = specify<TagFetcherTestState, TagFetcherDetails, string>(commonFetch<TagFetcherTestState, TagFetcherDetails>(), 'target',
    s => [s.tag1, s.tag2],
    (state: TagFetcherTestState) => ['/someUrl', {method: "Options"}],
    tagFetcherTestStateL.focusQuery('target'))

const fetcher = tagFetcher(fetcherSF)
const ps: HasPageSelection<TagFetcherDetails> = {
    pageSelection: {pageName: 'target'}
}

describe("tagFetcher", () => {
    it("should not load if the tags are not all present", () => {
        expect(fetcher.shouldLoad({...ps, tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({...ps, tag2: "t2", tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({...ps, tags: {target: []}})).toEqual(false)
        expect(fetcher.shouldLoad({...ps, tags: {target: []}})).toEqual(false)

        //and now some funny states... unlikely to get these, but just checking anyway
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tags: {target: ["t1", undefined]}})).toEqual(false)
        expect(fetcher.shouldLoad({...ps, tag2: "t2", tags: {target: [undefined, "t2"]}})).toEqual(false)
    })

    it("should load if the actual tags match the desired tags, but the target is undefined", () => {
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {target: ["t1", "t2"]}})).toEqual(true)
    })
    it("should not load if the actual tags match the desired tags and the target is defined", () => {
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", target: "somevalue", tags: {target: ["t1", "t2"]}})).toEqual(false)
    })

    it("should  load if the actual tags are defined but the current are not", () => {
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {}})).toEqual(true)
    })

    it("should  load if the actual tags are defined and the current are different", () => {
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {target: ["x1", "t2"]}})).toEqual(true)
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {target: ["t1", "x2"]}})).toEqual(true)
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {target: ["x1", "x2"]}})).toEqual(true)

        //and now some funny states... unlikely to get these, but just checking anyway
        expect(fetcher.shouldLoad({...ps, tag1: "t1", tag2: "t2", tags: {target: []}})).toEqual(true)
    })

    it("should load using the reqFn", () => {
        const loadInfo: LoadInfo<TagFetcherTestState, string> = fetcher.load({...ps, tag1: "t1", tag2: "t2", tags: {}})
        expect(loadInfo.requestInfo).toEqual("/someUrl")
        expect(loadInfo.requestInit).toEqual({method: 'Options'})
        expect(loadInfo.useThisInsteadOfLoad).toEqual(undefined)
    })

    it("should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again", () => {
        let start = {...ps, tag1: "t1", tag2: "t2", tags: {}};
        const loadInfo: LoadInfo<TagFetcherTestState, string> = fetcher.load(start)
        const mutate: MutateFn<TagFetcherTestState, string> = loadInfo.mutate
        expect(mutate(start)(200, "someString")).toEqual({...ps, "tag1": "t1", "tag2": "t2", "tags": {"target": ["t1", "t2"]}, "target": "someString"})
        expect(mutate(start)(300, "someString")).toEqual({
            ...ps,
            "errorMessage": "Req: [\"/someUrl\",{\"method\":\"Options\"}], Resp: \"someString\", 300, undefined, t1,t2",
            "tag1": "t1",
            "tag2": "t2",
            "tags": {"target": ["t1", "t2"]}
        })

    })

})

