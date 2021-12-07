//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {Page} from "../../components/page/page";
import {Loading} from "../../components/loading/loading";
import React from "react";
import {TwoByThree} from "../../components/layout/grid/twobythree/twoByThree";
import {TitleValueComp} from "../../components/data/attributeValues/titleValueComp";
import {AccountPersonalisationDomain} from "./accountPersonalisationDomain";
import {LensProps, LensState} from "@focuson/state";
import {loadingPage} from "../../components/page/loadingPage";
import {Statement} from "../statement/statement.domain";
import {makeTitle} from "../../utils/utils";

const statusEnum = 'enum(Received Complete,Sent,Recevied incomplete,Defaults recorded)'

export function AccountPersonalisationPage<S>() {
    return loadingPage<S, AccountPersonalisationDomain>(s => makeTitle("Account Personalistion ", s?.bankAccountNumber))
    ((state, accountPersonalisationDetails) =>
        (
            <TwoByThree>
                <TitleValueComp labels={[`status`, 'estimatedCompletionDate']} values={accountPersonalisationDetails}/>
                <TitleValueComp labels={['sortCode', 'bankAccountNumber', 'lastChanged']} values={accountPersonalisationDetails}/>
                <TitleValueComp title='Books/cards' labels={['personalisation', 'title', 'forename', 'middleName', 'surname', 'personalisation']} values={accountPersonalisationDetails?.primary}/>
                <TitleValueComp labels={['personalisation', 'title', 'forename', 'middleName', 'surname', 'personalisation']} values={accountPersonalisationDetails?.joint}/>
                <p>Statements</p>
                <p>First on fullfilment</p></TwoByThree>
        ))
}