//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {LensProps} from "@focuson/state";
import {stateStatementL, HasStatement} from "./examples/statement/statement.domain";
import {fetcherTree, loggingFetchFn, setJsonForFetchers} from "@focuson/fetcher";
import {fetchWithPrefix} from "./utils/utils";
import {statementFetcher} from "./examples/statement/statementFetcher";
import {customerIdL} from "./examples/common/common.domain";
import {displayPage, MultiPageDetails} from "./components/multipage/multiPage.domain";
import {Optional} from "@focuson/lens";


interface FullState extends HasStatement {
}
const emptyState: HasStatement = {}
interface IndexProps extends LensProps<FullState, FullState> {

}

interface DemoApp extends MultiPageDetails<FullState> {
    statement: {
        lens: Optional<State, PageState>,
        pageFunction: (props: { state: PageState }) => JSX.Element,
        initialState?: PageState  // if set then the PageState is set to this when the page is initially displayed

    },

}


function Index({state}: IndexProps) {
const page = displayPage(details, state, )
    return (<>
        <ul>
            <li>Statement</li>
            <li>Statement2x2</li>
        </ul>
        <Local/>
    </>)
}

const sFetcher = statementFetcher<FullState>(mainThingL, customerIdL, stateStatementL())
const tree = fetcherTree<FullState>(sFetcher)


export function onError(s: FullState, e: any): FullState {
    console.error("onError", e)
    throw e
}



const fetchFn = fetchWithPrefix("http://localhost:1234", loggingFetchFn)
setJsonForFetchers(fetchFn, tree, 'mainLoop', onError, state =>
    ReactDOM.render(<Index state={state}/>, document.getElementById('root')), fs => Promise.resolve(fs))



