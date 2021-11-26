//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from "react";
import {stringFrom} from "../../../utils/utils";
import {TitleProps, WrapTitle} from "../titles/titles";
import {ReactComponent} from "*.svg";

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
        {labels.map(label => (<div key={label.toString()} className='value'>{stringFrom(values, label)}</div>))}
    </WrapTitle>)
}
export function TitleAndValues<Titles, Values>({title, titles, values, labels}: TitleValuesProp<Titles, Values> & TitleProps) {
    return (<WrapTitle title={title}>
        <dl key="1" className="table-display">
            {labels.map(([titleLabel, valueLabel]) => (
                <React.Fragment key={titleLabel.toString()}>
                    <dt>{stringFrom(titles, titleLabel)}</dt>
                    <dd>{stringFrom(values, valueLabel)}</dd>
                </React.Fragment>
            ))}
        </dl>
    </WrapTitle>)
}
