import {TwoColumnPanel, TwoRowPanel} from "./twoChildren";

export interface FourChildrenProps {
    children: [JSX.Element, JSX.Element, JSX.Element, JSX.Element],
    title1?: string,
    title2?: string
}

export function TwoByTwo({children,  title1, title2}: FourChildrenProps) {
    const [child1, child2, child3, child4] = children
    return (
        <TwoRowPanel>
            <TwoColumnPanel title={title1}>{child1}{child2}</TwoColumnPanel>
            <TwoColumnPanel title={title2}>{child3}{child4}</TwoColumnPanel>
        </TwoRowPanel>)
}