import React from "react";
import {TwoColumnPanel} from "./twoChildren";
import {FourChildrenProps, TwoByTwo} from "./twoByTwo";


export default {
    component: TwoByTwo,
    title: 'Panels/TwoByTwo'
}
//@ts-ignore
const Template = (args: FourChildrenProps) =>
    <TwoByTwo {...args}>
        <p>Child1</p>
        <p>Child2</p>
        <p>Child3</p>
        <p>Child4</p>
    </TwoByTwo>;


export const WithTitle1and2 = Template.bind({});
// @ts-ignore
WithTitle1and2.args = {
    title1: 'Some Title 1',
    title2: 'Some Title 2',
};
export const WithTitle1 = Template.bind({});
// @ts-ignore
WithTitle1.args = {
    title1: 'Some Title 1'
};

export const WithTitle2 = Template.bind({});
// @ts-ignore
WithTitle2.args = {
    title2: 'Some Title 2',
};

export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {};


// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;