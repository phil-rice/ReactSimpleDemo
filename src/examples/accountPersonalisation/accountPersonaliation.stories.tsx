import React from "react";
import {AccountPersonalisationPage, AccountPersonalisationProps} from "./accountPersonalisation";
import {sampleAccountPersonalisation} from "./sampleAccountPersonalisation";


export default {
    component: AccountPersonalisationPage,
    title: 'Examples/AccountPersonalisation',
}


const Template = (args: AccountPersonalisationProps) =>
    <AccountPersonalisationPage {...args} />;

export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    loading: false,
    accountPersonalisationDetails: sampleAccountPersonalisation
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    loading: true,
    accountPersonalisationDetails: sampleAccountPersonalisation
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;