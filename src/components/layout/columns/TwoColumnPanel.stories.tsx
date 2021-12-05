import React from "react";
import {TitleProps} from "../../data/titles/titles";
import {TwoByTwo} from "../grid/twobytwo/twoByTwo";
import {TwoColumnPanel} from "./twoColumnPanel";
import {TwoChildrenProps} from "../../../utils/childrenProps";


export default {
    component: TwoByTwo,
    title: 'Layout/Columns/TwoColumnPanel',

}


const Template = (args: TwoChildrenProps & TitleProps) =>
    <TwoColumnPanel {...args}>
        <p>Child1</p>
        <p>Child2</p>
    </TwoColumnPanel>;

export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;