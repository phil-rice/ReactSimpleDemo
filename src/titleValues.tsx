import React from "react";
import {stringFrom} from "./utils";
import {TitleProps, WrapTitle} from "./titles";

export interface TitleValuesProp<Titles, Values> {
    titles: Titles,
    values: Values,
    labels: [(keyof Titles), keyof Values][]

}
export interface ValuesProp<Values> {
    values: Values,
    labels: (keyof Values)[]
}
export function Values<Values>({title, values, labels}: ValuesProp<Values> & TitleProps) {
    return (<WrapTitle title={title}>
        <table>
            <tbody>
            {labels.map(label => (
                <tr>
                    <td>{stringFrom(values, label)}</td>
                </tr>))}
            </tbody>
        </table>
    </WrapTitle>)
}
export function TitleAndValues<Titles, Values>({title, titles, values, labels}: TitleValuesProp<Titles, Values> & TitleProps) {
    return (<WrapTitle title={title}>
        <table>
            <tbody>
            {labels.map(([titleLabel, valueLabel]) => (
                <tr>
                    <td>{stringFrom(titles, titleLabel)}</td>
                    <td>{stringFrom(values, valueLabel)}</td>
                </tr>))}
            </tbody>
        </table>
    </WrapTitle>)
}
