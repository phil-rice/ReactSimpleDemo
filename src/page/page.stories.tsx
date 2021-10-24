import React from "react";
import {Page} from "./page";
import {TitleProps} from "../titles/titles";
import {SingleChildProps} from "../utils/utils";


export default {
    component: Page,
    title: 'Page/Page',
    argTypes: {
        label: {
            options: ['title1', 'title2'],
            control: {type: 'radio'}
        }
    }
}


const Template = (args: TitleProps & SingleChildProps) => <Page {...args} ><p>The page goes here</p></Page>;
export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'The Page Title'
};
export const WithOutTitle = Template.bind({});
// @ts-ignore
WithOutTitle.args = {};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;