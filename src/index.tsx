//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Lenses} from "@focuson/lens";
import {LensProps} from "@focuson/state";
import {loggingFetchFn, setJsonForFetchers, WouldLoad} from "@focuson/fetcher";
import {fetchWithPrefix, textChangedEvent} from "./utils/utils";

import {FullState, fullStateIdentityL} from "./examples/common/common.domain";
import {displayPage, MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {statementPageDetails} from "./examples/statement/statementPage";
import {debugPageDetails} from "./components/debug/debug";
import {SelectPage} from "./components/nav/selectPage";
import {statement2x2PageDetails} from "./examples/statement/statementPage2x2";
import {tree} from "./fetchers";
// import pact from '@pact-foundation/pact-node';


interface IndexProps extends LensProps<FullState, FullState> {
}

const demoAppPageDetails: MultiPageDetails<FullState> = {
    statement: statementPageDetails(fullStateIdentityL.focusQuery('statement')),
    statement2x2: statement2x2PageDetails(fullStateIdentityL.focusQuery('statement2x2')),
    debug: debugPageDetails()
}


function Index({state}: IndexProps) {
    let debug = state.json().showPageDebug;
    const page = displayPage(demoAppPageDetails, state, pageSelectionlens(), debug)
    if (debug) console.log("page", page)

    const changeCustomerId = (e?: string) => { if (e) state.focusOn('customerId').setJson(e)};
    let selectPageState = state.focusOn('pageSelection')
    return (<>
        <ul>
            <li>Customer Id<input id='customerId' type='text' onKeyPress={textChangedEvent('customerId', changeCustomerId)} onBlur={e => changeCustomerId(e.target?.value)}/></li>
            <li>
                <button onClick={
                    () => state.focusOn('tags')
                        // @ts-ignore
                        .setJson({})}>Reload
                </button>
            </li>
            <li><SelectPage pageName='Debug' state={selectPageState}/></li>
            <li><SelectPage pageName='statement' state={selectPageState}/></li>
            <li><SelectPage pageName='statement2x2' state={selectPageState}/></li>
        </ul>
        {page}
    </>)
}

export function onError(s: FullState, e: any): FullState {
    console.error("onError", e)
    throw e
}


//This is the method where we will do the 'first time' and 'loading flag' and fetching of data. For now it's a stub
function mutateJsonEachCall(state: FullState): Promise<FullState> {
    return Promise.resolve(state)
}

export function wouldLoadSummary(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => `${w.fetcher.description} ${JSON.stringify(w.reqData)}`).join(", ")
}

const fetchFn = fetchWithPrefix("http://localhost:8080", loggingFetchFn)

let setJson: (os: FullState, s: FullState) => Promise<FullState> = setJsonForFetchers(fetchFn, tree, 'mainLoop', onError,
    state => ReactDOM.render(<Index state={state}/>, document.getElementById('root')),
    mutateJsonEachCall, Lenses.identity<FullState>('state').focusQuery('fetcherDebug'))

let startState: FullState = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    tags: {},
    showPageDebug: false,
    fetcherDebug: {
        fetcherDebug: true,
        loadTreeDebug: true,
        whatLoad: true
    }
}


setJson(startState, startState)


