//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {Page} from "../page/page";
import {Loading, LoadingProps} from "../loading/loading";
import React from "react";
import {TwoByThree} from "../panels/twoByThree";
import {TitleValueComp} from "../attributeValues/titleValueComp";
import {AccountPersonalisationDomain} from "./accountPersonalisationDomain";


export interface AccountPersonalisationProps extends LoadingProps {
    accountPersonalisationDetails: AccountPersonalisationDomain
}


export function AccountPersonalisationPage({accountPersonalisationDetails, loading}: AccountPersonalisationProps) {
    const statusEnum = 'enum(Received Complete,Sent,Recevied incomplete,Defaults recorded)'
    return (<Page title='Account Personalisation'>
        <Loading loading={loading}>
            <TwoByThree>
                <TitleValueComp labels={[`status`, 'estimatedCompletionDate']} values={accountPersonalisationDetails}/>
                <TitleValueComp labels={['sortCode', 'bankAccountNumber', 'lastChanged']} values={accountPersonalisationDetails}/>
                <TitleValueComp title='Books/cards' labels={['personalisation', 'title', 'forename', 'middleName', 'surname', 'personalisation']} values={accountPersonalisationDetails.primary}/>
                <TitleValueComp labels={['personalisation', 'title', 'forename', 'middleName', 'surname', 'personalisation']} values={accountPersonalisationDetails.joint}/>
                <p>Statements</p>
                <p>First on fullfilment</p></TwoByThree>
        </Loading>
    </Page>)

}