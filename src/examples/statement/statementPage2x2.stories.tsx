import React from "react";
import {HasStatement, StatementPageProps} from "./statementPage";
import {sampleStatement} from "./sampleStatement";
import {HasStatement2x2, StatementPage2x2} from "./statementPage2x2";
import {lensState} from "@focuson/state";
import {StateForStatement2x2Test, StateForStatementTest} from "./statement.pact.spec";
import {Statement} from "./statement.domain";


export default {
    component: StatementPage2x2,
    title: 'Examples/Statement/StatementPage2x2',

}
const statementState = (statement2x2?: Statement) => lensState<StateForStatement2x2Test>({statement2x2, tags: {}, pageSelection: {pageName: 'statement'}}, (s: StateForStatementTest) => {}, 'statementState')
    .focusOn('statement2x2')

const Template = ({statement2x2}: HasStatement2x2) => StatementPage2x2<StateForStatement2x2Test>()({state: statementState(statement2x2)});

export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    statement2x2: sampleStatement
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    statement: null
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;