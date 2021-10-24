import React from "react";
import {ButtonTitleValue, TitleValueButtonProperties} from "./button";


export default {
    component: ButtonTitleValue,
    title: 'Buttons/ButtonTitleValue',
    argTypes: {
        titleLabel: {
            options: ['title1', 'title2'],
            control: { type: 'radio' }
        },
        valueLabel: {
            options: ['value1', 'value2'],
            control: { type: 'radio' }
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
const Template = (args: TitleValueButtonProperties<any, any>) => <ButtonTitleValue {...args} />;
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
    id: '1',
    titleLabel: 'title1',
    valueLabel: 'value1',
    titles: sampleTitles,
    values: sampleValues
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;