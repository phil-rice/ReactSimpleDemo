import {TitleProps} from "./titles";

export interface Statement extends  TitleProps {
    statementTitles: StatementTitles,
    statementValues: StatementValues,
    address: Address
}

export interface Address {
    addLineOne: string,
    addLineTwo: string,
    addLineThree: string,
    addLineFour: string,
    pcd: string
}
export interface StatementTitles {
    statementAddress: string,
    requestInterimPayment: string,
    regularStatement: string,
    interimStatement: string,
    statementFrequency: string,
    nbtLastStatementDate: string,
    lastStatementNo: string,
    lastStatementDate: string,
    nextStatementDate: string,
}
export interface StatementValues {
    nbtStatementFreq: string,
    nbtLastStatementDate: string,
    nbtLastStatementNo: string,
    nbNextStatementDate: string
}