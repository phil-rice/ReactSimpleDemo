import {Lens} from "@focuson/lens";

export const x = 1


interface Command {
    name: string
}

export interface FetcherCommand<Req, Main, T> extends Command {
    name: string
    requestFn: (req: Req) => FetchParams<Main, T>,
    check: (a: any) => a is T,
    error: (m: Main, a: any) => Main
}

interface FetchParams<Main, T> {
    lens: Lens<Main, T>,
    reqInfo: RequestInfo,
    reqInit?: RequestInit
}
export function fetcher<Req, Main, T>(name: string, requestFn: (req: Req) => FetchParams<Main, T>, check?: (a: any) => a is T) {
    return ({name, requestFn, check})
}

export type FetchFn = (req: RequestInfo, init?: RequestInit) => Promise<any>

export const fetchOne = <Req>(fetchFn: FetchFn, req: Req) => <Main, T>(f: FetcherCommand<Req, Main, T>) => {
    const {lens, reqInfo, reqInit} = f.requestFn(req)
    return fetchFn(reqInfo, reqInit).then(raw => (main: Main) => f.check(raw) ? lens.set(main, raw) : f.error(main, raw),
        err => (main: Main) => f.error(main, err)
    )
};

export const fetchers = (fetch: FetchFn) => <Req, Main>(fetchers: FetcherCommand<Req, Main, any>[]) => (req: Req) => async (m: Main) => {
    var fns: ((main: Main) => Main)[] = await Promise.all(fetchers.map(fetchOne<Req>(fetch, req)));
    var result: Main = fns.reduce((acc: Main, fn: (m: Main) => Main, i, arr) => fn(acc), m)
    return result

};
