import React from "react";
import {ChildrenProps} from "./utils";

export interface TitleProps {
    title?: string
}
export function OptionalTitle({title}: TitleProps) {
    return (<React.Fragment>{title && <h2>{title}</h2>}</React.Fragment>)
}
export function WrapTitle({title, children}: TitleProps & ChildrenProps) {
    return (<div><OptionalTitle title={title}/>{children}</div>)
}
