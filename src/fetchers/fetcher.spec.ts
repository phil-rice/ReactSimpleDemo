import {fetcher, FetcherCommand, fetchers, fetchOne} from "./fetcher";
import {Lenses} from "@focuson/lens";
import assert from "assert";

export const x = 1;

interface MainForTest {
    s1: string,
    s2: string,
    s3: string,
    error1?: string,
    error2?: string,
    error3?: string,
}
const lens = Lenses.identity<MainForTest>('main')
function isString(s: string): s is string {
    return true
}

function fetcherN(n: number): FetcherCommand<string, MainForTest, string> {
    return ({
        "name": "fetcher" + n,
        requestFn:
            req => ({
                // @ts-ignore
                lens: lens.focusOn('s' + n),
                reqInfo: `${req}${n}`,
                reqInit: ({method: 'post', body: `b${n}`})
            }),
        check: isString,
        error: (m, e) => {
            let result: any = {...m}
            result["error"+n] = e
            return result
        }
    })
}
const fetcher1 = fetcherN(1)
const fetcher2 = fetcherN(2)
const fetcher3 = fetcherN(3)

const fetchFn = (req: RequestInfo, init?: RequestInit): Promise<any> => {
    return req.toString().startsWith("error") ? Promise.reject("errorMsg") : Promise.resolve(`${req}-${JSON.stringify(init).replaceAll('"', "'")}`);
}

const main: MainForTest = {
    s1: "s1",
    s2: "s2",
    s3: "s3"
}
describe("fetchOne", () => {
    it("make a request using the fetchFn, adding the returned value to main using the lens", async () => {
        const fn = await fetchOne(fetchFn, "req")(fetcher1)
        assert.deepStrictEqual(fn(main), {"s1": "req1-{'method':'post','body':'b1'}", "s2": "s2", "s3": "s3"})
    })

    it("make a request using the fetchFn, and apply the error if there is one", async () => {
        const fn = await fetchOne(fetchFn, "error")(fetcher1)
        assert.deepStrictEqual(fn(main), {"error1": "errorMsg", "s1": "s1", "s2": "s2", "s3": "s3"})
    })
})

describe("fetchers", () => {
    it("should load many fetchers in parallel, using lens to update main", async () => {
        const result = await fetchers(fetchFn)([fetcher1, fetcher2, fetcher3])("req")(main)
        assert.deepStrictEqual(result, {
            "s1": "req1-{'method':'post','body':'b1'}",
            "s2": "req2-{'method':'post','body':'b2'}",
            "s3": "req3-{'method':'post','body':'b3'}"
        })

    })
    it("should load many fetchers in parallel,handlings errors", async () => {
        const result = await fetchers(fetchFn)([fetcher1, fetcher2, fetcher3])("error")(main)
        assert.deepStrictEqual(result, {
            "error1": "errorMsg", "error2": "errorMsg", "error3": "errorMsg",
            "s1": "s1", "s2": "s2", "s3": "s3"
        })
    })

})