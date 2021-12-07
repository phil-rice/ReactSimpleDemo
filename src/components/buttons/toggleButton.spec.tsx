import {lensState} from "@focuson/state";
import {shallow} from "enzyme";
import {ToggleButton} from "./ToggleButton";
import {enzymeSetup} from "../../enzymeAdapterSetup";

enzymeSetup()


export interface ToggleButtonStateForTest {
    value: boolean
}

const startState: ToggleButtonStateForTest = {
    value: true
}


describe("Toggle Button Page", () => {
    it("should have the title in the button", () => {
        const state = lensState<ToggleButtonStateForTest>(startState, (s: ToggleButtonStateForTest) => {}, 'ToggleButton').focusOn('value')
        const page = shallow(<ToggleButton title='Statement' state={state}/>)
        expect(page.text()).toEqual('Statement')
    })

    it("select toggle the value", () => {
        var remembered: ToggleButtonStateForTest = startState
        const state = lensState<ToggleButtonStateForTest>(startState, (s: ToggleButtonStateForTest) => {remembered=s}, 'ToggleButton').focusOn('value')
        const page = shallow(<ToggleButton title='Statement' state={state}/>)
        page.find("button").simulate('click')
        expect(remembered).toEqual({value: false})

    })
})