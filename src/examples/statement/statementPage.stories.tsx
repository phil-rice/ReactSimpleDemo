import React from "react";
import {StatementPage, StatementPageProps} from "./statementPage";
import {sampleStatement} from "./sampleStatement";
import {lensState} from "@focuson/state";
import {StateForStatement} from "./statement.pact.spec";


export default {
    component: StatementPage,
    title: 'Examples/Statement/StatementPage',

}
const statementState = lensState<StateForStatement>({statement: sampleStatement,tags:{statement: ["someId"]}, pageSelection: {pageName: 'statement'}}, (s: StateForStatement) => {}, 'statementState')
    .focusOn('statement')


const Template = (args: StatementPageProps<StateForStatement>) =>    <StatementPage {...args} />;

export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    loading: false,
    state: statementState
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    loading: true,
    state: statementState
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;