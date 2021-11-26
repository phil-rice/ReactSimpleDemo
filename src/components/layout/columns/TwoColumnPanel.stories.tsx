import React from "react";

import {Values, ValuesProp} from "../../data/attributeValues/titleValues";
import {TitleProps} from "../../data/titles/titles";
import {TwoByTwo} from "../grid/twobytwo/twoByTwo";
import {TwoRowPanel} from "../row/twoRow/twoRowPanel";
import {TwoColumnPanel} from "./twoColumnPanel";
import {TwoChildrenProps} from "../../../utils/childrenProps";
import {ButtonTitleValue, TitleValueButtonProperties} from "../../data/ButtonTitleValue/buttonTitleValue";


export default {
    component: TwoByTwo,
    title: 'Layout/Columns/TwoColumnPanel',

}


const Template = (args: TwoChildrenProps & TitleProps) =>
    <TwoColumnPanel {...args}>
        <p>Child1</p>
        <p>Child2</p>
    </TwoColumnPanel>;

export const WithTitle = Template.bind({});
// @ts-ignore
WithTitle.args = {
    title: 'Some Title',
};
export const WithoutTitle = Template.bind({});
// @ts-ignore
WithoutTitle.args = {};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;