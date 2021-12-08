import React from "react";
import {HasStatement, StatementPage, StatementPageProps} from "./statementPage";
import {sampleStatement} from "./statement.sample";
import {lensState} from "@focuson/state";
import {StateForStatement2x2Test, StateForStatementTest} from "./statement.pact.spec";
import {HasStatement2x2, StatementPage2x2} from "./statementPage2x2";
import {Statement} from "./statement.domain";


export default {
    component: StatementPage,
    title: 'Examples/Statement/StatementPage',

}
function statementState(statement?: Statement) {
    return lensState<StateForStatementTest>({statement, tags: {statement: ["someId"]}, pageSelection: {pageName: 'statement'}}, (s: StateForStatementTest) => {}, 'statementState')
        .focusOn('statement')
}

const Template = ({statement}: HasStatement) => StatementPage<StateForStatement2x2Test>()({state: statementState(statement)});


export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    statement: sampleStatement
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    statement: null
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;