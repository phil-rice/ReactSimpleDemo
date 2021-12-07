//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Lenses, Optional} from "@focuson/lens";
import {FetcherDebug, FetcherTree, FetchFn, loadTree, loggingFetchFn, wouldLoad, WouldLoad} from "@focuson/fetcher";
import {fetchWithPrefix} from "./utils/utils";

import {FullState, fullStateIdentityL} from "./examples/common/common.domain";
import {MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {debugPageDetails} from "./components/debug/debug";
import {tree} from "./fetchers";
import {IndexPage} from "./indexPage";
import {LensState, lensState} from "@focuson/state";
import {StatementPage} from "./examples/statement/statementPage";
import {StatementPage2x2} from "./examples/statement/statementPage2x2";
// import pact from '@pact-foundation/pact-node';


export const demoAppPageDetails: MultiPageDetails<FullState> = {
    statement: {lens: fullStateIdentityL.focusQuery('statement'), pageFunction: StatementPage, clearAtStart: true},
    statement2x2: {lens: fullStateIdentityL.focusQuery('statement2x2'), pageFunction: StatementPage2x2, clearAtStart: true},
    debug: debugPageDetails()
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

    if (state.pageSelection.firstTime) {
        console.log("premutate-firstTime")
        if (details.clearAtStart)
            return pageSelectionlens<FullState>().focusOn('firstTime').combine(details.lens).set(state, [false, undefined])
        else return pageSelectionlens<FullState>().focusOn('firstTime').set(state, false)
    } else
        return state
}

//This is the method where we will do the 'first time' and 'loading flag' and fetching of data. For now it's a stub
function postMutate(state: FullState): Promise<FullState> {
    return Promise.resolve(state)
}

export function wouldLoadSummary(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => `${w.fetcher.description} ${JSON.stringify(w.reqData)}`).join(", ")
}

const fetchFn = fetchWithPrefix("http://localhost:8080", loggingFetchFn)

//Will be pushed back to @focuson
export function setJsonForFetchers<State, Element>(fetchFn: FetchFn,
                                                   tree: FetcherTree<State>,
                                                   description: string,
                                                   onError: (os: State, e: any) => State,
                                                   fn: (lc: LensState<State, State>) => void,
                                                   preMutate: (s: State) => State,
                                                   postMutate: (s: State) => Promise<State>,
                                                   debugOptional?: Optional<State, FetcherDebug>): (os: State, s: State) => Promise<State> {
    return async (os: State, main: State): Promise<State> => {
        const debug = debugOptional?.getOption(main)
        let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForFetchers(fetchFn, tree, description, onError, fn, preMutate, postMutate, debugOptional)(fs, state), description))
        try {
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - start', main)
            const withPreMutate = preMutate(main)
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - after premutate', withPreMutate)
            if (withPreMutate) newStateFn(withPreMutate)
            if (debug?.whatLoad) {
                let w = wouldLoad(tree, withPreMutate);
                console.log("wouldLoad", wouldLoadSummary(w), w)
            }
            let newMain = await loadTree(tree, withPreMutate, fetchFn, debug).//
                then(s => s ? s : onError(s, Error('could not load tree'))).//
                catch(e => onError(withPreMutate, e))
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - after load', newMain)
            let finalState = await postMutate(newMain)
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
    state => ReactDOM.render(<IndexPage state={state} pages={['Debug', 'statement', 'statement2x2']}/>, document.getElementById('root')),
    preMutate, postMutate, Lenses.identity<FullState>('state').focusQuery('fetcherDebug'))

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


