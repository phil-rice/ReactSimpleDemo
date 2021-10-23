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