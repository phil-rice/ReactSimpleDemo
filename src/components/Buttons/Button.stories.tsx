import React from "react";
import {Button, ButtonProperties} from "./button";


export default {
    component: Button,
    title: 'Components/Buttons/Button',
    argTypes: {
        label: {
            options: ['title1', 'title2'],
            control: { type: 'radio' }
        }
    }
}

let sampleTitles = {
    title1: "Title One",
    title2: "Title Two"
}

const Template = (args: ButtonProperties<any>) => <Button {...args} />;
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
    id: '1',
    label: 'title1',
    titles: sampleTitles,
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;