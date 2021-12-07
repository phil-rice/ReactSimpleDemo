import {shallow} from "enzyme";
import React from "react";
import {enzymeSetup} from "../../enzymeAdapterSetup";
import {SelectPage} from "./selectPage";
import {lensState} from "@focuson/state";
import {HasPageSelection} from "../multipage/multiPage.domain";

enzymeSetup()

export interface SelectPageStateForTest extends HasPageSelection<any> {
}
const startState: SelectPageStateForTest = {
    pageSelection: {pageName: 'nothing important'}
}


describe("Select Page", () => {
    it("should have the name of page in the button", () => {
        const selectPageState = lensState<SelectPageStateForTest>(startState, (s: SelectPageStateForTest) => {}, 'selectPage').focusOn('pageSelection')
        const page = shallow(<SelectPage pageName='Statement' state={selectPageState}/>)
        expect(page.text()).toEqual('Statement')
    })

    it("select the page with firstTime true when selected, using lower case of the pageName", () => {
        var remembered: SelectPageStateForTest = startState
        const selectPageState = lensState<SelectPageStateForTest>(startState, (s: SelectPageStateForTest) => {remembered = s}, 'selectPage').focusOn('pageSelection')
        const page = shallow(<SelectPage pageName='Statement' state={selectPageState}/>)
        page.find("button").simulate('click')
        expect(remembered).toEqual({
            "pageSelection": {
                "firstTime": true,
                "pageName": "statement"
            }
        })

    })
})