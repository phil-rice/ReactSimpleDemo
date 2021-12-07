//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS


import {Statement, statementUrl} from "./statement.domain";
import {TwoByTwo} from "../../components/layout/grid/twobytwo/twoByTwo";
import {TitleAndValues, Values} from "../../components/data/attributeValues/titleValues";
import {Button} from "../../components/buttons/button";
import {ButtonTitleValue} from "../../components/data/ButtonTitleValue/buttonTitleValue";
import {LensProps} from "@focuson/state";
import {HasErrorMessage, HasTagHolder} from "../common/common.domain";
import {HasPageSelection, PageSelection} from "../../components/multipage/multiPage.domain";
import {GetOptioner, Lens} from "@focuson/lens";
import {commonFetch, simpleTagFetcher} from "../../utils/tagFetcher";
import {loadingPage} from "../../components/page/loadingPage";
import {makeTitle} from "../../utils/utils";

export interface HasStatement2x2 {
    statement2x2?: Statement
}

export type Statement2x2Requirements = HasStatement2x2 & HasTagHolder & HasErrorMessage


export function statement2x2Fetcher<S extends Statement2x2Requirements & HasPageSelection<HasStatement2x2>>(mainThingL: Lens<S, PageSelection<any>>, customerIdL: GetOptioner<S, string>) {
    return simpleTagFetcher<S, HasStatement2x2, 'statement2x2'>(commonFetch<S, HasStatement2x2>(),
        'statement2x2',
        s => [customerIdL.getOption(s)],
        s => [statementUrl<S>(customerIdL)(s), undefined])
}

export interface StatementPage2x2Props<State> extends LensProps<State, Statement> {
}

export function StatementPage2x2<State>() {
    return loadingPage<State, Statement>(s => makeTitle("2x2 ", s?.title))(
        (state, {address, statementTitles, statementValues}) =>
            <TwoByTwo title1={statementTitles.regularStatement} title2={statementTitles.interimStatement}>
                <Values title={statementTitles.statementAddress} values={address} labels={["addLineOne", "addLineTwo", "addLineThree", "addLineFour", "pcd"]}/>
                <TitleAndValues titles={statementTitles} values={statementValues} labels={[
                    ['statementFrequency', 'nbtStatementFreq'],
                    ['lastStatementDate', 'nbtLastStatementDate'],
                    ['lastStatementNo', 'nbtLastStatementNo'],
                    ['nextStatementDate', 'nbtNextStatementDate']]}/>
                <Button id='buttonRequestInterim' titles={statementTitles} label='requestInterimPayment'/>
                <ButtonTitleValue id='buttonNextStatement' titles={statementTitles} titleLabel='lastStatementDate' values={statementValues} valueLabel='nbtLastStatementDate'/>
            </TwoByTwo>)

}