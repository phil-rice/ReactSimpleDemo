//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../../../../enzymeAdapterSetup';
import {mount} from "enzyme";
import React from "react";
import {WrapTitle} from "../../../data/titles/titles";
import {TwoRowPanel} from "./twoRowPanel";

enzymeSetup()


describe("TwoRowPanel", () => {

    it("should render when there is a title", () => {
        const comp = mount(<TwoRowPanel title='TheTitle'><p>1</p><p>2</p></TwoRowPanel>)
        const wrapTitle = comp.find('WrapTitle')
        expect(wrapTitle.props()["title"]).toEqual("TheTitle")
        expect(wrapTitle.find('p').length).toBe(2)
        expect(comp.text()).toEqual("TheTitle12")
    })

    it("should render when there is not a title", () => {
        const comp = mount(<TwoRowPanel><p>1</p><p>2</p></TwoRowPanel>)
        const wrapTitle = comp.find('WrapTitle')
        expect(wrapTitle.props()["title"]).toEqual(undefined)
        expect(wrapTitle.find('p').length).toBe(2)
        expect(comp.text()).toEqual("12")
    })
})
