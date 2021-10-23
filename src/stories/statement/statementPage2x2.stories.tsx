import React from "react";
import "../../App.css";
import {ButtonTitleValue, TitleValueButtonProperties} from "../../components/button";
import {Values, ValuesProp} from "../../components/titleValues";
import {TwoChildrenProps, TwoColumnPanel, TwoRowPanel} from "../../components/twoChildren";
import {TitleProps} from "../../components/titles";
import {TwoByTwo} from "../../components/twoByTwo";
import {StatementPage, StatementPageProps} from "../../statement/statementPage";
import {sampleStatement} from "../../statement/sampleStatement";
import {StatementPage2x2} from "../../statement/statementPage2x2";


export default {
    component: StatementPage2x2,
    title: 'statement/StatementPage2x2',

}


const Template = (args: StatementPageProps) => <div>
    <link rel="stylesheet" type="text/css" href="index.css" media="screen"/>
    <StatementPage2x2 {...args} />
</div>;

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