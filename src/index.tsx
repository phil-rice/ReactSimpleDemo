//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {LensProps} from "@focuson/state";
import {HasStatement, statementFetcher, statementPageDetails, stateStatementL} from "./examples/statement/statement.domain";
import {fetcherTree, loggingFetchFn, setJsonForFetchers} from "@focuson/fetcher";
import {fetchWithPrefix} from "./utils/utils";

import {customerIdL, HasCustomerId} from "./examples/common/common.domain";
import {displayPage, HasPageSelection, MultiPageDetails, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {sampleStatement} from "./examples/statement/sampleStatement";

export interface FullState extends HasStatement, HasCustomerId, HasPageSelection<any> {
}
const emptyState: HasStatement = {}

interface IndexProps extends LensProps<FullState, FullState> {
}

const demoAppPageDetails: MultiPageDetails<FullState> = {
    statement: statementPageDetails(stateStatementL<FullState>())
}


function Index({state}: IndexProps) {
    const page = displayPage(demoAppPageDetails, state, pageSelectionlens())
    console.log("page", page)
    return (<>
        <ul>
            <li>Statement</li>
            <li>Statement2x2</li>
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
let setJson: (os: FullState, s: FullState) => Promise<FullState> = setJsonForFetchers(fetchFn, tree, 'mainLoop', onError, state =>
    ReactDOM.render(<Index state={state}/>, document.getElementById('root')), fs => Promise.resolve(fs))

let startState: FullState = {
    pageSelection: {pageName: 'statement'},
    statement: sampleStatement
}
setJson(startState, startState)


