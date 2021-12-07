import {displayPage, pageSelectionlens} from "./components/multipage/multiPage.domain";
import {NotATableHonest, TitleAndTextInput} from "./components/inputs/textInput";
import {UL} from "./components/lists/ul";
import {ClearAllTags} from "./components/debug/clearAllTags";
import {SelectPage} from "./components/nav/selectPage";
import React from "react";
import {LensProps} from "@focuson/state";
import {FullState} from "./examples/common/common.domain";
import {demoAppPageDetails} from "./index";

interface IndexPageProps extends LensProps<FullState, FullState> {
    pages: string[]
}

export function IndexPage({state, pages}: IndexPageProps) {
    let debug = state.json().showPageDebug;
    const page = displayPage(demoAppPageDetails, state, pageSelectionlens(), debug)
    if (debug) console.log("page", page)

    let selectPageState = state.focusOn('pageSelection')
    return (<>
        <NotATableHonest>
            <TitleAndTextInput title='Customer id' state={state.focusOn('customerId')}/>
        </NotATableHonest>
        <ul>
            <li><ClearAllTags state={state}/></li>
            { pages.map(p =>  <li key={p} ><SelectPage pageName={p} state={selectPageState}/> </li>)}
        </ul>
        {page}
    </>)
}