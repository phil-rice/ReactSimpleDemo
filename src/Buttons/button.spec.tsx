//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../enzymeAdapterSetup';
import {shallow, ShallowWrapper} from "enzyme";
import {Button, ButtonTitleValue} from "./button";

enzymeSetup()

let titles = {someTitle: "TheTitle"}
let values = {someValue: "TheValue"}

describe("Button", () => {

    it("should render", () => {
        const button = shallow(<Button titles={titles} label="someTitle"/>)
        expect(button.text()).toBe("TheTitle")
    })

    it("should have an id if specified", () => {
        const button = shallow(<Button id='someId' titles={titles} label="someTitle"/>)
        expect(button.props()["id"]).toBe("someId")
    })
})
describe("ButtonTitleValue", () => {

    it("should render", () => {
        const button = shallow(<ButtonTitleValue titles={titles} titleLabel='someTitle' values={values} valueLabel="someValue"/>)
        expect(button.text()).toBe("TheTitle:TheValue")
    })

    it("should have an id if specified", () => {
        const button = shallow(<ButtonTitleValue id='someId' titles={titles} titleLabel='someTitle' values={values} valueLabel="someValue"/>)
        expect(button.props()["id"]).toBe("someId")
    })
})