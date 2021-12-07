import React from "react";
import {Button, ButtonProperties} from "./button";
import {ToggleButton, ToggleButtonProps} from "./ToggleButton";
import {lensState} from "@focuson/state";


export default {
    component: ToggleButton,
    title: 'Components/Buttons/Toggle'
}

let state  = {
    value: true
}

const Template = (args: ToggleButtonProps<any>) => <ToggleButton {...args} />;
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
    title: 'title1',
    state: lensState(state, m => console.log('clicked', m), 'toggleButtonState')
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;