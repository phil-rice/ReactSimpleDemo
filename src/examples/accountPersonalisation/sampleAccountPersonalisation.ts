import {AccountPersonalisationDomain} from "./accountPersonalisation.domain";

export const sampleAccountPersonalisation: AccountPersonalisationDomain= {
    status: 'Received Complete',
    estimatedCompletionDate: '2020-10-01',
    sortCode: '10-11-12',
    bankAccountNumber: '12334353',
    lastChanged: '2020-09-01',
    primary:{
        title: 'Mr',
        forename: 'Fred',
        middleName: '',
        surname: 'Bloggs',
        personalisation: 'Mr Fred Bloggs'
    } ,
    joint: {
        title: 'Mrs',
        forename: 'Matilda',
        middleName: '',
        surname: 'Bloggs',
        personalisation: 'Mrs Matilda Bloggs'
    },
    primarySelected: false

}