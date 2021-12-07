import React from "react";
import {TitleProps} from "../data/titles/titles";
import {LoadingPage} from "./loadingPage";
import {LoadingStateForTest} from "../loading/loading.spec";
import {lensState} from "@focuson/state";


export default {
    component: LoadingPage,
    title: 'Layout/Page/LoadingPage'
}

interface LoadingPageState extends TitleProps {
    state: LoadingStateForTest
}
const Template = ({state, title}: LoadingPageState) => <LoadingPage title={title} state={lensState(state, s => {}, '')}><p>The page goes here</p></LoadingPage>;
export const WithTitleNotLoading = Template.bind({});
// @ts-ignore
WithTitleNotLoading.args = {
    title: 'The Page Title',
    state: {}
};
export const WithOutTitleNotLoading = Template.bind({});
// @ts-ignore
WithOutTitleNotLoading.args = {
    state: {}
};

export const WithTitleLoading = Template.bind({});
// @ts-ignore
WithTitleLoading.args = {
    title: 'The Page Title'
};
export const WithOutTitleLoading = Template.bind({});
// @ts-ignore
WithOutTitleLoading.args = {};
