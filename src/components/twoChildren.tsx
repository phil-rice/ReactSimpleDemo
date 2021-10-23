//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
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
