import {TitleProps, WrapTitle} from "../../../data/titles/titles";
import React from "react";
import {ThreeChildrenProps} from "../../../../utils/childrenProps";

export function ThreeRowPanel({title, children}: ThreeChildrenProps & TitleProps) {
    const [child1, child2, child3] = children
    return (<WrapTitle title={title}>
        {child1}
        {child2}
        {child3}
    </WrapTitle>)
}