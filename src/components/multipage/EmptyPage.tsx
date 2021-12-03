import {Lenses} from "@focuson/lens";
import React from "react";
import {OnePageDetails} from "./multiPage.domain";


export interface EmptyPageState {}

export function emptyPageDetails<State>(): OnePageDetails<State, EmptyPageState> {
    return ({
            lens: Lenses.constant({}, 'Emptypage'),
            pageFunction: EmptyPage
        }
    )
}

export interface EmptyPageProps {state: EmptyPageState}

export function EmptyPage(props: EmptyPageProps) {
    return (<></>)
}