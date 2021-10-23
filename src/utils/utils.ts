//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {ReactElement, ReactNode} from "react";

export interface ChildrenProps {
    children:ReactNode
}
export interface SingleChildProps {
    children:ReactElement
}
export function reportErrors(...details: any) {
    console.error(details)
}

export function zip<T1, T2>(list1: T1[], list2: T2[]) {
    if (list1.length !== list2.length) {
        reportErrors(`Failed to zip. List1${list1.length} <> ${list2.length}`, list1, list2)
        return "<UNDEFINED>"
    }
    return list1.map((t1, i) => [t1, list2[i]])
}

/** So that we get early notification with a nice error message when we mess up! */
export function stringFrom<K extends keyof Data, Data>(data: Data|undefined, k: K|undefined): string |undefined{
    if (data === undefined || k == undefined) return undefined;
    const result: any = data[k]
    if (result === undefined) reportErrors(`Could not retreive value ${k}`, k)
    return result.toString()
}