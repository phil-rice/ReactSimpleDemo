//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Lenses} from "@focuson/lens";
import {loggingFetchFn, setJsonForFetcherWithPreMutates} from "@focuson/fetcher";
import {fetchWithDelay, fetchWithPrefix} from "./utils/utils";

import {FullDetails, FullState, fullStateIdentityL} from "./examples/common/common.domain";
import {MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {Debug} from "./components/debug/debug";
import {tree} from "./fetchers";
import {StatementPage} from "./examples/statement/statementPage";
import {StatementPage2x2} from "./examples/statement/statementPage2x2";
import {makeSelectPages} from "./components/demo/selectPages";
import {CustomerId} from "./examples/index/customerId";
import {AccountPersonalisationPage} from "./examples/accountPersonalisation/accountPersonalisation";
// import pact from '@pact-foundation/pact-node';


export const demoAppPageDetails: MultiPageDetails<FullState> = {
    statement: {lens: fullStateIdentityL.focusQuery('statement'), pageFunction: StatementPage(), clearAtStart: true},
    statement2x2: {lens: fullStateIdentityL.focusQuery('statement2x2'), pageFunction: StatementPage2x2(), clearAtStart: true},
    accountPersonalisation: {lens: fullStateIdentityL.focusQuery('accountPersonalisation'), pageFunction: AccountPersonalisationPage(), clearAtStart: true},
    debug: {lens: fullStateIdentityL.focusQuery('stateDebug'), pageFunction: Debug}
}

export function onError(s: FullState, e: any): FullState {
    console.error("onError", e)
    throw e
}

/** This clears up the state if it is the first time something is called */
function preMutate(state: FullState): FullState {
    console.log("premutate", state)
    // @ts-ignore
    const details = demoAppPageDetails[state.pageSelection.pageName]

    if (details && state.pageSelection.firstTime) {
        console.log("premutate-firstTime")
        if (details.clearAtStart)
            return pageSelectionlens<FullState>().focusOn('firstTime').combine(details.lens).set(state, [false, undefined])
        else return pageSelectionlens<FullState>().focusOn('firstTime').set(state, false)
    } else
        return state
}

//This is the method that mutates the state after fetching. At the moment it does nothing
function postMutate(state: FullState): Promise<FullState> {
    return Promise.resolve(state)
}

//how we get data from the apis
const fetchFn = fetchWithDelay(2000, fetchWithPrefix("http://localhost:8080", loggingFetchFn))

//The main page. SelectPages is a react component
const SelectPages = makeSelectPages<FullState, FullDetails>(
    demoAppPageDetails,
    fullStateIdentityL.focusOn('pageSelection'),
    fullStateIdentityL.focusQuery('stateDebug'),
    state => <CustomerId state={state.focusOn('customerId')}/>
)


let pages = ['statement', 'statement2x2', 'accountPersonalisation'];
let setJson: (os: FullState, s: FullState) => Promise<FullState> = setJsonForFetcherWithPreMutates(fetchFn, tree, 'mainLoop', onError,
    state => ReactDOM.render(<SelectPages state={state} pages={pages}/>, document.getElementById('root')),
    preMutate, postMutate, Lenses.identity<FullState>('state').focusQuery('fetcherDebug'))

let startState: FullState = {
    pageSelection: {pageName: 'statement'},
    customerId: "mycid",
    tags: {},
    showPageDebug: true,
    fetcherDebug: {
        fetcherDebug: true,
        loadTreeDebug: true,
        whatLoad: true
    }
}

setJson(startState, startState)


