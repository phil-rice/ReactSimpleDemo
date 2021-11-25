import React from "react";
import {TwoChildrenProps, TwoRowPanel} from "./twoChildren";
import {TitleProps} from "../titles/titles";
import {ThreeChildrenProps, ThreeRowPanel} from "./threeChildren";


export default {
    component: ThreeRowPanel,
    title: 'Panels/ThreeRowPanel'
}


const Template = (args: ThreeChildrenProps & TitleProps) => <ThreeRowPanel {...args}>
    <p>Child1</p>
    <p>Child2</p>
    <p>Child3</p>
</ThreeRowPanel>;

export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;