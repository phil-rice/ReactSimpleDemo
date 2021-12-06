import React from "react";
import {SelectPage, SelectPageProps} from "./selectPage";
import {lensState} from "@focuson/state";
import {StateForStatementTest} from "../../examples/statement/statement.pact.spec";
import {sampleStatement} from "../../examples/statement/sampleStatement";
import {SelectPageStateForTest} from "./selectpage.spec";

export default {
    component: SelectPage,
    title: 'Nav/SelectPage'
}

const selectPageState = lensState<SelectPageStateForTest>({pageSelection: {pageName: 'somethingelse'}}, (s: SelectPageStateForTest) => {}, 'selectPageState').focusOn('pageSelection')

const Template = (args: SelectPageProps<any>) => <SelectPage {...args} />;
export const SelectStatement = Template.bind({});
// @ts-ignore
SelectStatement.args = {
    pageName: 'Statement',
    state: selectPageState
};


