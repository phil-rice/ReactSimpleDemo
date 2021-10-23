import React from "react";
import {Button, ButtonProperties} from "../../components/button";
import {Loading, LoadingProps} from "../../loading/loading";


export default {
    component: Loading,
    title: 'Loading/Loading'
}

const Template = (args: LoadingProps) => <Loading {...args}><p>The Component is now being displayed</p></Loading>;
export const LoadingTrue = Template.bind({});
// @ts-ignore
LoadingTrue.args = {
  loading: true
};
export const LoadingFalse = Template.bind({});
// @ts-ignore
LoadingFalse.args = {
  loading: false
};

// export const Primary = () => <ButtonTitleValue id='1' titlelabel='title1' titles={sampleTitles} valuelabel='value1' values={sampleValues}/>;

// export const Primary = () => <Values title='Some Title' values={sampleValues} labels={["value1", "value2"]}/>;