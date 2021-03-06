//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {TitleAndValues, Values} from "../../components/data/attributeValues/titleValues";
import {Button} from "../../components/buttons/button";
import React from "react";
import {Statement, statementUrl} from "./statement.domain";
import {TwoRowPanel} from "../../components/layout/row/twoRow/twoRowPanel";
import {TwoColumnPanel} from "../../components/layout/columns/twoColumnPanel";
import {ButtonTitleValue} from "../../components/data/ButtonTitleValue/buttonTitleValue";
import {LensProps} from "@focuson/state";
import {GetOptioner, Lens} from "@focuson/lens";
import {HasPageSelection, PageSelection} from "../../components/multipage/multiPage.domain";
import {HasErrorMessage, HasTagHolder} from "../common/common.domain";
import {commonFetch, simpleTagFetcher} from "../../utils/tagFetcher";
import {loadingPage} from "../../components/page/loadingPage";
import {makeTitle} from "../../utils/utils";

export interface HasStatement {
    statement?: Statement
}

export type StatementRequirements = HasStatement & HasTagHolder & HasErrorMessage


export function statementFetcher<S extends StatementRequirements & HasPageSelection<HasStatement>>(mainThingL: Lens<S, PageSelection<any>>, customerIdL: GetOptioner<S, string>) {
    return simpleTagFetcher<S, HasStatement, 'statement'>(
        commonFetch<S, HasStatement>(),
        'statement',
        s => [customerIdL.getOption(s)],
        s => [statementUrl<S>(customerIdL)(s), undefined])
}

export interface StatementPageProps<State> extends LensProps<State, Statement> {
}

export function StatementPage<State>() {
    return loadingPage<State, Statement>(s => makeTitle("Main ", s?.title))
    ((state, {address, statementTitles, statementValues}) =>
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
        </TwoRowPanel>)

}