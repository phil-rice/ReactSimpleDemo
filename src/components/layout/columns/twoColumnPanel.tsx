import {TitleProps, WrapTitle} from "../../data/titles/titles";
import React from "react";
import {TwoChildrenProps} from "../../../utils/childrenProps";

export const TwoColumnPanel = ({title, children}: TwoChildrenProps & TitleProps) => {
    return <WrapTitle title={title}>
        <div className='columns'>{children}</div>
    </WrapTitle>;
}