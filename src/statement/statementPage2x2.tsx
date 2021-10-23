//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {Page} from "../components/page";
import {Loading, LoadingProps} from "../loading/loading";
import {TwoColumnPanel, TwoRowPanel} from "../components/twoChildren";
import {TitleAndValues, Values} from "../components/titleValues";
import {Button, ButtonTitleValue} from "../components/button";
import React from "react";
import {Statement} from "./domain";
import {TwoByTwo} from "../components/twoByTwo";


export interface StatementPageProps extends LoadingProps {
    statement: Statement
}

export function StatementPage2x2({statement, loading}: StatementPageProps) {
    const {title, address, statementTitles, statementValues} = statement;
    return (<Page title={title}>
        <Loading loading={loading}>
            <TwoByTwo title1={statementTitles.regularStatement} title2={statementTitles.interimStatement}>
                <Values title={statementTitles.statementAddress} values={address} labels={["addLineOne", "addLineTwo", "addLineThree", "addLineFour", "pcd"]}/>
                <TitleAndValues titles={statementTitles} values={statementValues} labels={[
                    ['statementFrequency', 'nbtStatementFreq'],
                    ['nbtLastStatementDate', 'nbtLastStatementDate'],
                    ['lastStatementNo', 'nbtLastStatementNo'],
                    ['nextStatementDate', 'nbNextStatementDate']]}/>
                <Button id='buttonRequestInterim' titles={statementTitles} label='requestInterimPayment'/>
                <ButtonTitleValue id='buttonNextStatement' titles={statementTitles} titleLabel='lastStatementDate' values={statementValues} valueLabel='nbtLastStatementDate'/>
            </TwoByTwo></Loading>
    </Page>)

}