import {stringFrom} from "./utils";
import React from "react";
import {Values} from "./titleValues";

export interface ButtonProperties<Titles> {
    titles: Titles,
    label: keyof Titles
}
export interface TitleValueButtonProperties<Titles, Values> {
    titles: Titles,
    values: Values,
    titlelabel: keyof Titles
    valuelabel: keyof Values
}
export function ButtonTitleValue<Title, Values>({titles, values, titlelabel, valuelabel}: TitleValueButtonProperties<Title, Values>) {
    return (<button>{stringFrom(titles, titlelabel)}:{stringFrom(values, valuelabel)}</button>)
}
export function Button<Title>({titles, label}: ButtonProperties<Title>) {
    return (<button>{stringFrom(titles, label)}</button>)
}