//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {stringFrom} from "../utils/utils";
import React from "react";
import {Values} from "../attributeValues/titleValues";

export interface ButtonProperties<Titles> {
    id?: string
    titles: Titles,
    label: keyof Titles
}
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
export function Button<Title>({id, titles, label}: ButtonProperties<Title>) {
    return (<button id={id}>{stringFrom(titles, label)}</button>)
}