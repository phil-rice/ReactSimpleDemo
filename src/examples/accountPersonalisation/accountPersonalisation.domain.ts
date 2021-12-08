import {GetOptioner} from "@focuson/lens";
import {or} from "../../utils/utils";

export const accountPersonalisationUrl = <S>(customerIdL: GetOptioner<S, string>) =>
    (s: S) => `/accountPersonalisation/${or<string>(() => {throw new Error('cannot get accountPersonalisationUrl without customerId') })(customerIdL.getOption(s))}`;

export interface HasAccountPersonalisationDomain {
    accountPersonalisation?: AccountPersonalisationDomain
}

export interface AccountPersonalisationDomain {
    status: 'Received Complete' | 'Sent' | 'Recevied incomplete' | 'Defaults recorded',
    estimatedCompletionDate: string,
    sortCode: string,
    bankAccountNumber: string,
    lastChanged: string,
    primary: OnePersonalisationDomain,
    joint: OnePersonalisationDomain,
    primarySelected: boolean
}
export interface OnePersonalisationDomain {
    title: string,
    forename: string,
    middleName: string,
    surname: string,
    personalisation: string
}