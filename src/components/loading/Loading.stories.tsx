import React from "react";
import {Loading} from "./loading";
import {lensState} from "@focuson/state";
import {LoadingStateForTest} from "./loading.spec";


export default {
    component: Loading,
    title: 'Loading/Loading'
}


const Template = ({state}: any) => <Loading state={lensState(state, s => {}, 'loading state')}><p>The Component is now being displayed</p></Loading>;
export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
    state: {}
};

export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
    state: null
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;