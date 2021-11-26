import React from "react";
import {TitleAndValues, TitleValuesProp} from "./titleValues";


export default {
    component: TitleAndValues,
    title: 'Data/AttributeValues/TitleAndValues',
    argTypes: {
        labels: {
            options: [
                [['title1', 'value1'], ['title2', 'value2']],
                [['title2', 'value2'], ['title1', 'value1']]],
            control: {type: 'radio'}
        }
    }
}

let sampleTitles = {
    title1: "Title One",
    title2: "Title Two"
}

let sampleValues = {
    value1: "Value One",
    value2: "Value Two"
}
const Template = (args: TitleValuesProp<any, any>) => <div>
    <TitleAndValues {...args} /></div>;
export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
    labels: [['title1', 'value1'], ['title2', 'value2']],
    titles: sampleTitles,
    values: sampleValues
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {
    labels: [['title1', 'value1'], ['title2', 'value2']],
    titles: sampleTitles,
    values: sampleValues
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;