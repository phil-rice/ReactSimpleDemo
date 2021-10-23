import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TitleAndValues, Values} from "./titleValues";
import {Button, ButtonTitleValue} from "./button";
import {TwoColumnPanel, TwoRowPanel} from "./twoChildren";
import {Page} from "./page";
import {Statement} from "./statement";
import {Loading, LoadingProps} from "./loading";


let state: Statement & LoadingProps = {
    loading: false,
    title: "Statement",
    statementTitles: {
        statementAddress: "Statement Address",
        regularStatement: "Regular Statement",
        interimStatement: "Interim Statmenet",
        statementFrequency: "Statement Frequency",
        nbtLastStatementDate: "Last Statement Date",
        lastStatementNo: "Last Statement No",
        lastStatementDate: "Last Statement Date",
        nextStatementDate: "Next Statement Date",
        requestInterimPayment: "Request Interim Payment"
    }, statementValues: {
        nbtStatementFreq: "Monthly",
        nbtLastStatementDate: "31st March 2021",
        nbNextStatementDate: "30th April 2021",
        nbtLastStatementNo: "00031"
    }, address: {
        addLineOne: "4 Privet Drive",
        addLineTwo: "Little Whinging",
        addLineThree: "",
        addLineFour: "Surrey",
        pcd: "LW10 3SD"
    }
}

interface StatementPageProps extends LoadingProps {
    state: Statement
}


function StatementPage({state, loading}: StatementPageProps) {
    const {title, address, statementTitles, statementValues} = state;
    return (<Page title={title}>
        <Loading loading={loading}>
            <TwoRowPanel>
                <TwoColumnPanel title={statementTitles.regularStatement}>
                    <Values title={statementTitles.statementAddress}values={address} labels={["addLineOne", "addLineTwo", "addLineThree", "addLineFour", "pcd"]}/>
                    <TitleAndValues titles={statementTitles} values={statementValues} labels={[
                        ['statementFrequency', 'nbtStatementFreq'],
                        ['nbtLastStatementDate', 'nbtLastStatementDate'],
                        ['lastStatementNo', 'nbtLastStatementNo'],
                        ['nextStatementDate', 'nbNextStatementDate']]}/>
                </TwoColumnPanel>
                <TwoColumnPanel title={statementTitles.interimStatement}>
                    <Button titles={statementTitles} label='requestInterimPayment'/>
                    <ButtonTitleValue titles={statementTitles} titlelabel='lastStatementDate' values={statementValues} valuelabel='nbtLastStatementDate'/>
                </TwoColumnPanel>
            </TwoRowPanel></Loading>
    </Page>)

}

ReactDOM.render(<StatementPage state={state}/>, document.getElementById('root'));


