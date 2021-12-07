import {OptionalTitle} from "../titles/titles";
import React from "react";

export interface TitleValueCompProps<T> {
    title?: string,
    labels: (keyof T)[],
    values?: T
}
export function TitleValueComp<T>({title, labels, values}: TitleValueCompProps<T>) {
    return (<>
        <div className=''>
            <OptionalTitle title={title}/>
            <dl>
                {labels.map((l, i) => (<React.Fragment key={i}>
                    <dd>{l}</dd>
                    <dt>{values && values[l]}</dt>
                </React.Fragment>))}
            </dl>
        </div>
    </>)
}