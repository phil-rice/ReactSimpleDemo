//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../../../enzymeAdapterSetup';
import {mount, shallow} from "enzyme";
import React from "react";
import {WrapTitle} from "./titles";
import {Values} from "../attributeValues/titleValues";

enzymeSetup()

let titles = {title1: "Title1", title2: "Title2"}
let values = {value1: "Value1", value2: "Value2"}

describe("Values", () => {

    it("should render when there is a title", () => {
        const comp = shallow((<Values title="SomeTitle" values={values} labels={['value2', 'value1']}/>))
        expect(comp.find('WrapTitle').length).toBe(1)
        expect(comp.find('WrapTitle').props()["title"]).toEqual("SomeTitle")

        const wrapTitle = comp.find('WrapTitle')
        expect(wrapTitle.find('.value').length).toBe(2)
        expect(wrapTitle.find('.value').at(0).equals(<div className='value'>Value2</div>)).toBe(true)
        expect(wrapTitle.find('.value').at(1).equals(<div className='value'>Value1</div>)).toBe(true)
    })

    it("should render when there is not a title", () => {
        const comp = shallow((<Values values={values} labels={['value2', 'value1']}/>))
        expect(comp.find('WrapTitle').length).toBe(1)
        expect(comp.find('WrapTitle').props()["title"]).toEqual(undefined)

        const wrapTitle = comp.find('WrapTitle')
        expect(wrapTitle.find('.value').length).toBe(2)
        expect(wrapTitle.find('.value').at(0).equals(<div className='value'>Value2</div>)).toBe(true)
        expect(wrapTitle.find('.value').at(1).equals(<div className='value'>Value1</div>)).toBe(true)
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
