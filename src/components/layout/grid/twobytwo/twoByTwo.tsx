import {TwoRowPanel} from "../../row/twoRow/twoRowPanel";
import {TwoColumnPanel} from "../../columns/twoColumnPanel";
import {FourChildrenProps} from "../../../../utils/childrenProps";

export function TwoByTwo({children,  title1, title2}: FourChildrenProps) {
    const [child1, child2, child3, child4] = children
    return (
        <TwoRowPanel>
            <TwoColumnPanel title={title1}>{child1}{child2}</TwoColumnPanel>
            <TwoColumnPanel title={title2}>{child3}{child4}</TwoColumnPanel>
        </TwoRowPanel>)
}