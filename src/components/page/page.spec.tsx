//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../../enzymeAdapterSetup';
import {shallow} from "enzyme";
import {Page, PageTitle} from "./page";
import React from "react";

enzymeSetup()

describe("Page", () => {

    it("should render", () => {
        const page = shallow(<Page title="TheTitle"><p>TheChild</p></Page>)
        expect(page.contains(<p>TheChild</p>)).toBe(true)
        expect(page.contains(<PageTitle title="TheTitle"/>)).toBe(true)
    })
})
describe("PageTitle", () => {

    it("should render", () => {
        const pageTitle = shallow(<PageTitle title="someTitle" />)
        expect(pageTitle.contains(<div><h1>someTitle</h1></div>)).toBe(true)
        expect(pageTitle.text()).toBe("someTitle")
    })
})