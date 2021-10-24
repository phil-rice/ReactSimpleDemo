//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {Statement} from "./domain";
import {LoadingProps} from "../loading/loading";

export let sampleStatement: Statement & LoadingProps = {
    loading: false,
    title: "Statement",
    statementTitles: {
        statementAddress: "Statement Address",
        regularStatement: "Regular Statement",
        interimStatement: "Interim Statement",
        statementFrequency: "Statement Frequency",
        lastStatementDate: "Last Statement Date",
        lastStatementNo: "Last Statement No",
        nextStatementDate: "Next Statement Date",
        requestInterimPayment: "Request Interim Payment"
    }, statementValues: {
        nbtStatementFreq: "Monthly",
        nbtLastStatementDate: "31st March 2021",
        nbtNextStatementDate: "30th April 2021",
        nbtLastStatementNo: "00031"
    }, address: {
        addLineOne: "4 Privet Drive",
        addLineTwo: "Little Whinging",
        addLineThree: "",
        addLineFour: "Surrey",
        pcd: "LW10 3SD"
    }
}