import React from "react";
import {ButtonTitleValue, TitleValueButtonProperties} from "../../components/button";
import {Values, ValuesProp} from "../../components/titleValues";
import {TwoChildrenProps, TwoRowPanel} from "../../components/twoChildren";
import {TitleProps} from "../../components/titles";


export default {
    component: TwoRowPanel,
    title: 'Panels/TwoRowPanel'
}


const Template = (args: TwoChildrenProps & TitleProps) => <TwoRowPanel {...args}>
    <p>Child1</p>
    <p>Child2</p>
</TwoRowPanel>;

export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
};
export const WithOutTitle = Template.bind({});
// @ts-ignore
WithOutTitle.args = {
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;