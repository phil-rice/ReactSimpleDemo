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