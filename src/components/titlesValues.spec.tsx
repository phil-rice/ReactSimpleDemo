//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../enzymeAdapterSetup';
import {mount, shallow} from "enzyme";
import {PageTitle} from "./page";
import React from "react";
import {OptionalTitle, WrapTitle} from "./titles";

enzymeSetup()

describe("OptionalTitle", () => {

    it("should render when there is a title", () => {
        const comp = mount((<div>before<OptionalTitle title="TheTitle"/>After</div>))
        expect(comp.find('h2').length).toBe(1)
        expect(comp.find('h2').text()).toEqual("TheTitle")
        expect(comp.text()).toBe("beforeTheTitleAfter")
    })

    it("should render when there is not a title", () => {
        const comp = mount((<div>before<OptionalTitle/>After</div>))
        expect(comp.find('h2').length).toBe(0)
        expect(comp.text()).toBe("beforeAfter")
    })
})
describe("WrapTitle", () => {

    it("should render when there is a title", () => {
        const comp = mount(<WrapTitle title="SomeTitle"><p>Text</p></WrapTitle>)
        expect(comp.find('h2').length).toBe(1)
        expect(comp.find('h2').text()).toEqual("SomeTitle")
        expect(comp.contains(<p>Text</p>)).toBe(true)
    })

    it("should render when there is not a title", () => {
        const comp = mount(<WrapTitle><p>Text</p></WrapTitle>)
        expect(comp.find('h2').length).toBe(0)
        expect(comp.contains(<p>Text</p>)).toBe(true)
    })
})
