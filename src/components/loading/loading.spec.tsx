//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../../enzymeAdapterSetup';
import {mount} from "enzyme";
import React from "react";
import {Loading} from "./loading";
import {lensState} from "@focuson/state";

enzymeSetup()

export interface LoadingStateForTest {}

function state(main?: LoadingStateForTest) {
    return lensState(main, s => {}, 'loadingState')
}


describe("Loading", () => {

    it("should NOT render the embedded component when state json is undefined ", () => {
        const comp = mount(<Loading state={state(undefined)}>
            <div>child</div>
        </Loading>)
        expect(comp.find("div").length).toBe(0)
        expect(comp.text()).toEqual("Loading")
    })
    it("should render the embedded component when state json is defined", () => {
        const comp = mount(<Loading state={state({})}>
            <div>child</div>
        </Loading>)
        expect(comp.find("div").length).toBe(1)
        expect(comp.text()).toEqual("child")
    })

})

