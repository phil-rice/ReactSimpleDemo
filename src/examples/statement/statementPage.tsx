//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {Page} from "../../components/page/page";
import {Loading, LoadingProps} from "../../components/loading/loading";
import {TitleAndValues, Values} from "../../components/data/attributeValues/titleValues";
import {Button} from "../../components/Buttons/button";
import React from "react";
import {Statement} from "./statement.domain";
import {TwoRowPanel} from "../../components/layout/row/twoRow/twoRowPanel";
import {TwoColumnPanel} from "../../components/layout/columns/twoColumnPanel";
import {ButtonTitleValue} from "../../components/data/ButtonTitleValue/buttonTitleValue";
import {LensProps} from "@focuson/state";


export interface StatementPageProps<State> extends LensProps<State, Statement>, LoadingProps {
}

export function StatementPage<State>({state, loading}: StatementPageProps<State>) {
    const {title, address, statementTitles, statementValues} = state.json();
    return (<Page title={"Main"+ title}>
        <Loading loading={loading}>
            <TwoRowPanel>
                <TwoColumnPanel title={statementTitles.regularStatement}>
                    <Values title={statementTitles.statementAddress} values={address} labels={["addLineOne", "addLineTwo", "addLineThree", "addLineFour", "pcd"]}/>
                    <TitleAndValues titles={statementTitles} values={statementValues} labels={[
                        ['statementFrequency', 'nbtStatementFreq'],
                        ['lastStatementDate', 'nbtLastStatementDate'],
                        ['lastStatementNo', 'nbtLastStatementNo'],
                        ['nextStatementDate', 'nbtNextStatementDate']]}/>
                </TwoColumnPanel>
                <TwoColumnPanel title={statementTitles.interimStatement}>
                    <Button id='buttonRequestInterim' titles={statementTitles} label='requestInterimPayment'/>
                    <ButtonTitleValue id='buttonNextStatement' titles={statementTitles} titleLabel='lastStatementDate' values={statementValues} valueLabel='nbtLastStatementDate'/>
                </TwoColumnPanel>
            </TwoRowPanel>
        </Loading>
    </Page>)

}