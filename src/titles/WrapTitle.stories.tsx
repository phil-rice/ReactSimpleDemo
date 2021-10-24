import React from "react";
import {ButtonTitleValue, TitleValueButtonProperties} from "../Buttons/button";
import {OptionalTitle, TitleProps, WrapTitle} from "./titles";


export default {
    component: WrapTitle,
    title: 'Titles/WrapTitle',

}

const Template = (args: TitleProps) => <WrapTitle {...args}><p>Here is the wrapped Component</p></WrapTitle>;
export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    id: '1',
    title: 'Some Title'
};
export const WithOutTitle = Template.bind({});
// @ts-ignore
WithOutTitle.args = {
    id: '1'
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;