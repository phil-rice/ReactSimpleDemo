import {stringFrom} from "../../../utils/utils";
import React from "react";

export interface TitleValueButtonProperties<Titles, Values> {
    id?: string
    titles: Titles,
    values: Values,
    titleLabel: keyof Titles
    valueLabel: keyof Values
}
export function ButtonTitleValue<Title, Values>({id, titles, values, titleLabel, valueLabel}: TitleValueButtonProperties<Title, Values>) {
    return (<button id={id}>{stringFrom(titles, titleLabel)}:{stringFrom(values, valueLabel)}</button>)
}