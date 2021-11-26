import {TwoColumnPanel} from "../../columns/twoColumnPanel";
import {ThreeRowPanel} from "../../row/threeRow/threeRowPanel";
import {SixChildrenProps} from "../../../../utils/childrenProps";

export function TwoByThree({children,  title1, title2, title3}: SixChildrenProps) {
    const [child1, child2, child3, child4, child5, child6] = children
    return (
        <ThreeRowPanel>
            <TwoColumnPanel title={title1}>{child1}{child2}</TwoColumnPanel>
            <TwoColumnPanel title={title2}>{child3}{child4}</TwoColumnPanel>
            <TwoColumnPanel title={title3}>{child5}{child6}</TwoColumnPanel>
        </ThreeRowPanel>)
}