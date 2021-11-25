import React from "react";
import {SixChildrenProps, TwoByThree} from "./twoByThree";


export default {
    component: TwoByThree,
    title: 'Panels/TwoByThree'
}
//@ts-ignore
const Template = (args: SixChildrenProps) =>
    <TwoByThree {...args}>
        <p>Child1</p>
        <p>Child2</p>
        <p>Child3</p>
        <p>Child4</p>
        <p>Child5</p>
        <p>Child6</p>
    </TwoByThree>;


export const WithTitle1and2and3 = Template.bind({});
// @ts-ignore
WithTitle1and2and3.args = {
    title1: 'Some Title 1',
    title2: 'Some Title 2',
    title3: 'Some Title 3',
};
// export const WithTitle1 = Template.bind({});
// // @ts-ignore
// WithTitle1.args = {
//     title1: 'Some Title 1'
// };
//
// export const WithTitle2 = Template.bind({});
// // @ts-ignore
// WithTitle2.args = {
//     title2: 'Some Title 2',
// };
//
// export const WithoutTitle = Template.bind({});
// // @ts-ignore
// WithoutTitle.args = {};
//

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;