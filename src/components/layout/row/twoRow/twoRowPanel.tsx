import {TitleProps, WrapTitle} from "../../../data/titles/titles";
import React from "react";
import {TwoChildrenProps} from "../../../../utils/childrenProps";

export function TwoRowPanel({title, children}: TwoChildrenProps & TitleProps) {
    const [child1, child2] = children
    return (<WrapTitle title={title}>
        {child1}
        {child2}
    </WrapTitle>)
}