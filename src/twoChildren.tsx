import React from "react";
import {TitleProps, WrapTitle} from "./titles";

export interface TwoChildrenProps {
    children: [JSX.Element, JSX.Element]
}
export const TwoColumnPanel = ({title, children}: TwoChildrenProps & TitleProps) => {
    return <WrapTitle title={title}>
        <div className='columns'>{children}</div>
    </WrapTitle>;
}


export function TwoRowPanel({title, children}: TwoChildrenProps & TitleProps) {
    const [child1, child2] = children
    return (<WrapTitle title={title}>
        {child1}
        {child2}
    </WrapTitle>)
}
