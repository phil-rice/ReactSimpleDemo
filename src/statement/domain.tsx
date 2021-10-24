//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {TitleProps} from "../titles/titles";

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
    lastStatementNo: string,
    lastStatementDate: string,
    nextStatementDate: string,
}
export interface StatementValues {
    nbtStatementFreq: string,
    nbtLastStatementDate: string,
    nbtLastStatementNo: string,
    nbtNextStatementDate: string
}