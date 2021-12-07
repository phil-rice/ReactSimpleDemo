import React from "react";
import {AccountPersonalisationPage} from "./accountPersonalisation";
import {sampleAccountPersonalisation} from "./sampleAccountPersonalisation";
import {AccountPersonalisationDomain} from "./accountPersonalisationDomain";
import {lensState} from "@focuson/state";


export default {
    component: AccountPersonalisationPage,
    title: 'Examples/AccountPersonalisation',
}


const Template = ({accountPersonalisationDetails}: any) =>
    AccountPersonalisationPage<AccountPersonalisationDomain>()({state: lensState(accountPersonalisationDetails, s => {}, '')});

export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    accountPersonalisationDetails: sampleAccountPersonalisation
}
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    accountPersonalisationDetails: null
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;