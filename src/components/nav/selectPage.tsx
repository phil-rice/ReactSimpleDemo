import {LensProps} from "@focuson/state";
import {PageSelection} from "../multipage/multiPage.domain";
import React from "react";

export interface SelectPageProps<State> extends LensProps<State, PageSelection<any>> {
    pageName: string
}

export function SelectPage<State>({state, pageName}: SelectPageProps<State>) {
    return (<button onClick={() => state.setJson({pageName: pageName.toLowerCase(), firstTime: true})}>{pageName}</button>)
}