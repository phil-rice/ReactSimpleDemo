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
    const page = displayPage(demoAppPageDetails, state, pageSelectionlens())
    console.log("page", page)
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
    console.log("mutateJsonEachCall", state)
    return Promise.resolve(state)
}

export function wouldLoadSummary(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => `${w.fetcher.description} ${JSON.stringify(w.reqData)}`).join(", ")
}

export function calledApiUrl(wouldLoad: WouldLoad[]) {
    return wouldLoad.filter(w => w.load).map(w => w?.reqData?.[0]).join(";")
}
// function setJsonForFetchers<State>(fetchFn: FetchFn,
//                                    tree: FetcherTree<State>,
//                                    description: string,
//                                    onError: (os: State, e: any) => State,
//                                    fn: (lc: LensState<State, State>) => void,
//                                    mutate: (s: State) => Promise<State>,
//                                    debugOptional?: Optional<State, FetcherDebug>): (os: State, s: State) => Promise<State> {
//     return async (os: State, main: State): Promise<State> => {
//         const debug = debugOptional?.getOption(main)
//         let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForFetchers(fetchFn, tree, description, onError, fn, mutate, debugOptional)(fs, state), description))
//         try {
//             if (debug?.fetcherDebug) console.log('setJsonForFetchers - start', main)
//             if (main) newStateFn(main)
//
//             let w = wouldLoad(tree, main)
//             if (debug?.whatLoad) {console.log("wouldLoad", wouldLoadSummary(w), w)}
//
//             let newMain = await loadTree(tree, main, fetchFn, debug).//
//                 then(s => s ? s : onError(s, Error('could not load tree'))).//
//                 catch(e => onError(main, e))
//             if (debug?.fetcherDebug) console.log('setJsonForFetchers - after load', newMain)
//             let finalState = await mutate(newMain)
//             if (debug?.fetcherDebug) console.log('setJsonForFetchers - final', finalState)
//             newStateFn(finalState)
//             return finalState
//         } catch (e) {
//             let newMain = onError(os, e);
//             newStateFn(newMain)
//             return newMain
//         }
//     }
// }

let setJson: (os: FullState, s: FullState) => Promise<FullState> = (os: FullState, s: FullState) => {
    console.log("setJson", os, s)
    return setJsonForFetchers(fetchFn, tree, 'mainLoop', onError,
        state => ReactDOM.render(<Index state={state}/>, document.getElementById('root')),
        mutateJsonEachCall, Lenses.identity<FullState>('state').focusQuery('fetcherDebug'))(os, s)
}

let startState: FullState = {
    pageSelection: {pageName: 'statement'},
    statement: sampleStatement,
    showPageDebug: true,
    fetcherDebug: {
        fetcherDebug: true,
        loadTreeDebug: true,
        whatLoad: true
    }
}
setJson(startState, startState)


