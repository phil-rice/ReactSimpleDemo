import {CommonTagFetcher, onTagFetchError, SpecificTagFetcher, specify, tagFetcher, TagHolder} from "./tagFetcher";
import {Lenses} from "@focuson/lens";
import {LoadInfo, MutateFn, Tags} from "@focuson/fetcher";
import exp from "constants";
import {commonFetch} from "../examples/common/common.domain";

interface TagFetcherTestState {
    tag1?: string,
    tag2?: string,
    tags: TagHolder,
    target?: string,
    errorMessage?: string
}
const tagFetcherTestStateL = Lenses.identity<TagFetcherTestState>('state')
const fetcherSF: SpecificTagFetcher<TagFetcherTestState, string> = specify<TagFetcherTestState, string>(commonFetch<TagFetcherTestState>(), 'theseTags',
    s => [s.tag1, s.tag2],
    (state: TagFetcherTestState) => ['/someUrl', {method: "Options"}],
    tagFetcherTestStateL.focusQuery('target'))

const fetcher = tagFetcher(fetcherSF)

describe("tagFetcher", () => {
    it("should not load if the tags are not all present", () => {
        expect(fetcher.shouldLoad({tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({tag1: "t1", tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({tag2: "t2", tags: {}})).toEqual(false)
        expect(fetcher.shouldLoad({tags: {theseTags: []}})).toEqual(false)
        expect(fetcher.shouldLoad({tags: {theseTags: []}})).toEqual(false)

        //and now some funny states... unlikely to get these, but just checking anyway
        expect(fetcher.shouldLoad({tag1: "t1", tags: {theseTags: ["t1", undefined]}})).toEqual(false)
        expect(fetcher.shouldLoad({tag2: "t2", tags: {theseTags: [undefined, "t2"]}})).toEqual(false)
    })

    it("should load if the actual tags match the desired tags, but the target is undefined", () => {
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {theseTags: ["t1", "t2"]}})).toEqual(true)
    })
    it("should not load if the actual tags match the desired tags and the target is defined", () => {
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", target: "somevalue", tags: {theseTags: ["t1", "t2"]}})).toEqual(false)
    })

    it("should  load if the actual tags are defined but the current are not", () => {
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {}})).toEqual(true)
    })

    it("should  load if the actual tags are defined and the current are different", () => {
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {theseTags: ["x1", "t2"]}})).toEqual(true)
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {theseTags: ["t1", "x2"]}})).toEqual(true)
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {theseTags: ["x1", "x2"]}})).toEqual(true)

        //and now some funny states... unlikely to get these, but just checking anyway
        expect(fetcher.shouldLoad({tag1: "t1", tag2: "t2", tags: {theseTags: []}})).toEqual(true)
    })

    it("should load using the reqFn", () => {
        const loadInfo: LoadInfo<TagFetcherTestState, string> = fetcher.load({tag1: "t1", tag2: "t2", tags: {}})
        expect(loadInfo.requestInfo).toEqual("/someUrl")
        expect(loadInfo.requestInit).toEqual({method: 'Options'})
        expect(loadInfo.useThisInsteadOfLoad).toEqual(undefined)
    })

    it("should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again", () => {
        let start = {tag1: "t1", tag2: "t2", tags: {}};
        const loadInfo: LoadInfo<TagFetcherTestState, string> = fetcher.load(start)
        const mutate: MutateFn<TagFetcherTestState, string> = loadInfo.mutate
        expect(mutate(start)(200, "someString")).toEqual({"tag1": "t1", "tag2": "t2", "tags": {"theseTags": ["t1", "t2"]}, "target": "someString"})
        expect(mutate(start)(300, "someString")).toEqual({
            "errorMessage": "Req: ['/someUrl',{'method':'Options'}], Resp: someString, 300, undefined, t1,t2",
            "tag1": "t1",
            "tag2": "t2",
            "tags": {"theseTags": ["t1", "t2"]}
        })

    })

})