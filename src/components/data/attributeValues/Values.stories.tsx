import React from "react";
import {Values, ValuesProp} from "./titleValues";
import {ButtonTitleValue, TitleValueButtonProperties} from "../ButtonTitleValue/buttonTitleValue";


export default {
    component: Values,
    title: 'Data/AttributeValues/Values',
    argTypes: {
        labels: {
            options: [['value1', 'value2'],['value2', 'value1']],
            control: { type: 'radio' }
        }
    }
}



let sampleValues = {
    value1: "Value One",
    value2: "Value Two"
}
const Template = (args: ValuesProp< any>) => <Values {...args} />;
export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
    labels: ['value1','value2'],
    values: sampleValues
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {
    labels: ['value1','value2'],
    values: sampleValues
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;