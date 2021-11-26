import {OptionalTitle} from "../titles/titles";
import React from "react";

export interface TitleValueCompProps<T> {
    title?: string,
    labels: (keyof T)[],
    values:T
}
export function TitleValueComp<T>({title, labels, values}: TitleValueCompProps<T>) {
    return (<>
        <div className=''>
            <OptionalTitle title={title}/>
            <dl>
                {labels.map(l => (<>
                    <dd>{l}</dd>
                    <dt>{values[l]}</dt>
                </>))}
            </dl>
        </div>
    </>)
}