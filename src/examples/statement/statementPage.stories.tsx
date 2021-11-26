import React from "react";
import {StatementPage, StatementPageProps} from "./statementPage";
import {sampleStatement} from "./sampleStatement";


export default {
    component: StatementPage,
    title: 'Examples/Statement/StatementPage',

}


const Template = (args: StatementPageProps) =>    <StatementPage {...args} />;

export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    loading: false,
    statement: sampleStatement
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    loading: true,
    statement: sampleStatement
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;