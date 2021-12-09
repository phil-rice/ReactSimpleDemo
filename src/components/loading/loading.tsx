//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from "react";
import {SingleChildProps} from "../../utils/utils";
import {LensProps} from "@focuson/state";

export function ShowLoading() {
    return (<p>Loading</p>)
}

export function     Loading<S, D>({children, state}: SingleChildProps & LensProps<S, D>) {
    // console.log("loading", state.optJson())
    return state.optJson() ? children : <ShowLoading/>
}