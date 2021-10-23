import React from "react";
import {SingleChildProps} from "./utils";
import {TitleProps} from "./titles";

const PageTitle = ({title}: TitleProps) => (<div><h1>{title}</h1></div>);

export const Page = ({title, children}: TitleProps & SingleChildProps) => (<div className='page'><PageTitle title={title}/>{children}</div>);