import React from "react";
import {ButtonTitleValue, TitleValueButtonProperties} from "../../components/button";
import {OptionalTitle, TitleProps} from "../../components/titles";


export default {
    component: OptionalTitle,
    title: 'Titles/OptionalTitle',

}

const Template = (args: TitleProps) => <OptionalTitle {...args} />;
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