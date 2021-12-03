//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Lenses} from "@focuson/lens";
import {LensProps} from "@focuson/state";
import {HasStatement, statement2x2PageDetails, statementFetcher, statementPageDetails, stateStatementL} from "./examples/statement/statement.domain";
import {FetcherDebug, fetcherTree, loggingFetchFn, setJsonForFetchers, WouldLoad} from "@focuson/fetcher";
import {fetchWithPrefix} from "./utils/utils";

import {customerIdL, HasCustomerId} from "./examples/common/common.domain";
import {displayPage, HasPageSelection, MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {sampleStatement} from "./examples/statement/sampleStatement";

export interface FullState extends HasStatement, HasCustomerId, HasPageSelection<any> {
    fetcherDebug?: FetcherDebug
    showPageDebug?: boolean
}

interface IndexProps extends LensProps<FullState, FullState> {
}

const demoAppPageDetails: MultiPageDetails<FullState> = {
    statement: statementPageDetails(stateStatementL<FullState>()),
    statement2x2: statement2x2PageDetails(stateStatementL<FullState>())
}


function Index({state}: IndexProps) {
    let debug = state.json().showPageDebug;
    const page = displayPage(demoAppPageDetails, state, pageSelectionlens(), debug)
    if (debug) console.log("page", page)
    return (<>
        <ul>
            <li>
                <button onClick={() => state.focusOn('pageSelection').setJson({pageName: 'statement', firstTime: false})}>Statement</button>
            </li>
            <li>
                <button onClick={() =>
                    state.focusOn('pageSelection').setJson({pageName: 'statement2x2', firstTime: false})
                }>Statement 2x2
                </button>
            </li>
        </ul>
        {page}
    </>)
}

const sFetcher = statementFetcher<FullState>(pageSelectionlens(), customerIdL, stateStatementL())
const tree = fetcherTree<FullState>(sFetcher)


export function onError(s: FullState, e: any): FullState {
    console.error("onError", e)
    throw e
}


const fetchFn = fetchWithPrefix("http://localhost:1234", loggingFetchFn)

//This is the method where we will do the 'first time' and 'loading flag' and fetching of data. For now it's a stub
function mutateJsonEachCall(state: FullState): Promise<FullState> {
    return Promise.resolve(state)
}

export function wouldLoadSummary(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => `${w.fetcher.description} ${JSON.stringify(w.reqData)}`).join(", ")
}

export function calledApiUrl(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => w?.reqData?.[0]).join(";")
}

let setJson: (os: FullState, s: FullState) => Promise<FullState> = setJsonForFetchers(fetchFn, tree, 'mainLoop', onError,
    state => ReactDOM.render(<Index state={state}/>, document.getElementById('root')),
    mutateJsonEachCall, Lenses.identity<FullState>('state').focusQuery('fetcherDebug'))

let startState: FullState = {
    pageSelection: {pageName: 'statement'},
    statement: sampleStatement,
    showPageDebug: false,
    fetcherDebug: {
        fetcherDebug: false,
        loadTreeDebug: false,
        whatLoad: false
    }
}
setJson(startState, startState)


