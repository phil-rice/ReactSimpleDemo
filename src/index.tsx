//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Lenses, Optional} from "@focuson/lens";
import {LensProps, lensState, LensState} from "@focuson/state";
import {HasStatement, statement2x2PageDetails, statementFetcher, stateStatementL} from "./examples/statement/statement.domain";
import {FetcherDebug, FetcherTree, fetcherTree, FetchFn, loadTree, loggingFetchFn, wouldLoad, WouldLoad} from "@focuson/fetcher";
import {fetchWithPrefix, textChangedEvent} from "./utils/utils";

import {customerIdL, HasCustomerId, HasTagHolder} from "./examples/common/common.domain";
import {displayPage, HasPageSelection, MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {statementPageDetails} from "./examples/statement/statementPage";
import path from "path";

export interface FullState extends HasStatement, HasCustomerId, HasPageSelection<any>, HasTagHolder {
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
    function changeCustomerId(e?: string) {
        console.log('changeCustId', e);
        if (e) state.focusOn('customerId').setJson(e)
    }
    return (<>
        <ul>
            <li>Customer Id<input id='customerId' type='text' onKeyPress={textChangedEvent('customerId', changeCustomerId)} onBlur={e => changeCustomerId(e.target?.value)}/></li>
            <li>
                <button onClick={
                    () => state.focusOn('tags')
                        // @ts-ignore
                        .setJson(undefined)}>Reload
                </button>
            </li>
            <li>
                <button onClick={() => state.focusOn('pageSelection').setJson({pageName: 'statement2x2', firstTime: false})}>Statement2x2</button>
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

const sFetcher = statementFetcher<FullState>(pageSelectionlens(), customerIdL)
const tree = fetcherTree<FullState>(sFetcher)


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

export function setJsonForFetchers<State>(fetchFn: FetchFn,
                                          tree: FetcherTree<State>,
                                          description: string,
                                          onError: (os: State, e: any) => State,
                                          fn: (lc: LensState<State, State>) => void,
                                          mutate: (s: State) => Promise<State>,
                                          debugOptional?: Optional<State, FetcherDebug>): (os: State, s: State) => Promise<State> {
    return async (os: State, main: State): Promise<State> => {
        const debug = debugOptional?.getOption(main)
        let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForFetchers(fetchFn, tree, description, onError, fn, mutate, debugOptional)(fs, state), description))
        try {
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - start', main)
            if (main) newStateFn(main)
            if (debug?.whatLoad) {
                let w = wouldLoad(tree, main);
                console.log("wouldLoad", wouldLoadSummary(w), w)
            }
            let newMain = await loadTree(tree, main, fetchFn, debug)
                .then(s => s ? s : onError(s, Error('could not load tree')))
                .catch(e => onError(main, e))
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - after load', newMain)
            let finalState = await mutate(newMain)
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - final', finalState)
            newStateFn(finalState)
            return finalState
        } catch (e) {
            console.error("An unexpected error occured. Rolling back the state", e)
            let newMain = onError(os, e);
            newStateFn(newMain)
            return newMain
        }
    }
}

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

var pact = require('@pact-foundation/pact-node');
var server = pact.createStub({
    cors: true,
    port: 8080,
    pactUrls: ['./pacts/browser-cmsbackend.json'],
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "info",
});
server.start()

setJson(startState, startState)


