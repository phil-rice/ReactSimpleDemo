import React from "react";
import {Page} from "./page";
import {TitleProps} from "../data/titles/titles";
import {SingleChildProps} from "../../utils/utils";
import {LoadingPage} from "./loadingPage";


export default {
    component: LoadingPage,
    title: 'Page/Loading'
}


const Template = (args: TitleProps & SingleChildProps) => <LoadingPage {...args} ><p>The page goes here</p></LoadingPage>;
export const WithTitleNotLoading = Template.bind({});
// @ts-ignore
WithTitleNotLoading.args = {
    title: 'The Page Title'
};
export const WithOutTitleNotLoading = Template.bind({});
// @ts-ignore
WithOutTitleNotLoading.args = {};

export const WithTitleLoading = Template.bind({});
// @ts-ignore
WithTitleLoading.args = {
    loading: true,
    title: 'The Page Title'
};
export const WithOutTitleLoading = Template.bind({});
// @ts-ignore
WithOutTitleLoading.args = {loading: true};
