import {TwoColumnPanel} from "./twoChildren";
import {ThreeRowPanel} from "./threeChildren";

export interface SixChildrenProps {
    children: [JSX.Element, JSX.Element, JSX.Element, JSX.Element, JSX.Element, JSX.Element],
    title1?: string,
    title2?: string,
    title3?: string
}

export function TwoByThree({children,  title1, title2, title3}: SixChildrenProps) {
    const [child1, child2, child3, child4, child5, child6] = children
    return (
        <ThreeRowPanel>
            <TwoColumnPanel title={title1}>{child1}{child2}</TwoColumnPanel>
            <TwoColumnPanel title={title2}>{child3}{child4}</TwoColumnPanel>
            <TwoColumnPanel title={title3}>{child5}{child6}</TwoColumnPanel>
        </ThreeRowPanel>)
}