import React from "react";
import "../App.css";
import {ButtonTitleValue, TitleValueButtonProperties} from "../Buttons/button";
import {Values, ValuesProp} from "../attributeValues/titleValues";
import {TwoChildrenProps, TwoColumnPanel, TwoRowPanel} from "../panels/twoChildren";
import {TitleProps} from "../titles/titles";
import {TwoByTwo} from "../panels/twoByTwo";
import {StatementPage, StatementPageProps} from "./statementPage";
import {sampleStatement} from "./sampleStatement";
import {StatementPage2x2} from "./statementPage2x2";


export default {
    component: StatementPage2x2,
    title: 'statement/StatementPage2x2',

}


const Template = (args: StatementPageProps) =>
    <StatementPage2x2 {...args} />;

export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    loading: true,
    statement: sampleStatement
};
export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    loading: false,
    statement: sampleStatement
}

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;