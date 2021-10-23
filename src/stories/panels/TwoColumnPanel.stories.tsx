import React from "react";
import "../../App.css";
import {ButtonTitleValue, TitleValueButtonProperties} from "../../components/button";
import {Values, ValuesProp} from "../../components/titleValues";
import {TwoChildrenProps, TwoColumnPanel, TwoRowPanel} from "../../components/twoChildren";
import {TitleProps} from "../../components/titles";
import {TwoByTwo} from "../../components/twoByTwo";


export default {
    component: TwoByTwo,
    title: 'Panels/TwoColumnPanel',

}


const Template = (args: TwoChildrenProps & TitleProps) => <div>
    <link rel="stylesheet" type="text/css" href="index.css" media="screen" />
    <TwoColumnPanel {...args}>
    <p>Child1</p>
    <p>Child2</p>
</TwoColumnPanel></div>;

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