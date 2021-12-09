//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from "react";
import {SingleChildProps} from "../../utils/utils";
import {TitleProps} from "../data/titles/titles";
import {Loading} from "../loading/loading";
import {Page} from "./page";
import {LensProps, LensState} from "@focuson/state";


export function LoadingPage<S, D>({state, title, children}: TitleProps & SingleChildProps & LensProps<S, D>) {
    return (<><Page title={title}><Loading state={state}>{children}</Loading></Page></>);
}

export const loadingPage = <S extends any, D extends any>(title: (d?: D) => string) =>
    (pageFn: (state: LensState<S, D>, d: D) => JSX.Element) =>
        ({state}: LensProps<S, D>) => {
            const json = state.optJson()
            // console.log("loadingPage", json)
            return <LoadingPage title={title(state.optJson())} state={state}>{json ? pageFn(state, json) : <div/>}</LoadingPage>;
        }

