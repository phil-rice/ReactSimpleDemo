import {displayPage, MultiPageDetails, PageSelection} from "../multipage/multiPage.domain";
import {SelectPage} from "../nav/selectPage";
import React from "react";
import {LensProps, LensState} from "@focuson/state";
import {Debug} from "../debug/debug";
import {ToggleButton} from "../buttons/ToggleButton";
import {Lens, Optional} from "@focuson/lens";

export interface HasShowPageDebug {
    showPageDebug?: boolean
}
interface IndexPageProps<S> extends LensProps<S, S> {
    pages: string[]
}

export const makeSelectPages = <S extends Details & HasShowPageDebug, Details extends any>(pageDetails: MultiPageDetails<S>, pageSelectionL: Lens<S, PageSelection<any>>, stateDebugL: Optional<S, boolean>, header: (s: LensState<S, S>) => React.ReactElement) => ({state, pages}: IndexPageProps<S>) => {
    let debug = state.json().showPageDebug;
    const page = displayPage<S, MultiPageDetails<S>>(pageDetails, state, pageSelectionL, debug)
    if (debug) console.log("page", page)
    if (debug) console.log("page", page)

    let selectPageState = state.copyWithLens<PageSelection<Details>>(pageSelectionL)
    let debugState = state.copyWithLens<boolean>(stateDebugL);
    return (<>
        {header(state)}
        <ul>
            <li><ToggleButton title='Debug' state={debugState}/></li>
            {pages.map(p => <li key={p}><SelectPage pageName={p} state={selectPageState}/></li>)}
        </ul>
        {page}
        <Debug state={debugState}/>
    </>)
};