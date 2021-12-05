import React from "react";
import {TitleValueComp, TitleValueCompProps} from "./titleValueComp";


export default {
    component: TitleValueComp,
    title: 'Data/AttributeValues/TitleValueComp'}

interface SampleDataDomain{
    name1: string,
    name2: string,
    name3: string
}
const sampleData : SampleDataDomain= {
    name1: "value1",
    name2: "value2",
    name3: "value3",
}
const Template = (args: TitleValueCompProps<SampleDataDomain>) => <div><TitleValueComp {...args} /></div>;
    
export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
    labels: ['name1', 'name2', 'name3'],
    values: sampleData
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {
    labels: ['name1', 'name2', 'name3'],
    values: sampleData
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;