import {Optional, Getter, Lens, Lenses} from "@focuson/lens";
import {LensState} from "@focuson/state";
import React from "react";


export interface MultiPageDetails<State> {
    [name: string]: OnePageDetails<State, any>
}
export interface OnePageDetails<State, PageState> {
    lens: Optional<State, PageState>,
    pageFunction: (props: { loading: boolean, state: LensState<State, PageState> }) => JSX.Element,
    initialState?: PageState  // if set then the PageState is set to this when the page is initially displayed
}

export interface PageSelection<Details> {
    pageName: keyof Details,
    firstTime?: boolean
}
export interface HasPageSelection<Details> {
    pageSelection: PageSelection<Details>
}

export function pageSelectionlens<State extends HasPageSelection<any>>() {return Lenses.identity<State>('state').focusOn('pageSelection')}

export function displaySinglePage<State, PageState>(state: LensState<State, State>, pageSelectionName: string, pageDetails?: OnePageDetails<State, PageState>, debug?: boolean) {
    if (!pageDetails) return (<p>Unrecognised main page ${pageSelectionName}</p>)
    let props = pageDetails.lens.getOption(state.json());
    if (debug) console.log('displaySinglePage', props)
    if (!props) return (<p>Cannot find props for main page ${pageSelectionName}</p>)
    return pageDetails.pageFunction({state: state.chainLens(pageDetails.lens), loading: false})
}
export function displayPage<State, Details extends MultiPageDetails<State>>(details: Details, state: LensState<State, State>, pageSelectionG: Getter<State, PageSelection<Details>>, debug?: boolean) {
    if (debug) console.log('displayPage', state.json())
    const pageSelection = pageSelectionG.get(state.json())
    if (debug) console.log('pageSelection', pageSelection)
    if (!pageSelection) return (<p>Unrecognised page selection ${state.optional}</p>)
    const pageDetails = details[pageSelection.pageName]
    if (debug) console.log('pageDetails', pageDetails)
    return displaySinglePage(state, pageSelection.pageName.toString(), pageDetails, debug)
}


/** this changes the current page. It just changes it in the state and marks it as 'first time' other code needs to 'process' this.
 * That other code is in the 'setJson' method. It must read the 'first time flag' and apply it, and apply any fetchers*/
export function changePage<State>(pageSelectionL: Lens<State, PageSelection<any>>): (state: State, pageName: string) => State {
    return (state, pageName) => pageSelectionL.set(state, {pageName, firstTime: true})
}

