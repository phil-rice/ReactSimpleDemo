import {Lenses} from "@focuson/lens";
import {LensProps} from "@focuson/state";
import {NotATableHonest, TitleAndTextInput} from "../../components/inputs/textInput";
import React from "react";

export interface HasCustomerId {
    customerId?: string
}

export const customerIdL = Lenses.identity<HasCustomerId>('hasCustomerid').focusQuery('customerId')

export function CustomerId<S>({state}: LensProps<S, string>) {
    return <NotATableHonest>
        <TitleAndTextInput title='Customer id' state={state}/>
    </NotATableHonest>
}