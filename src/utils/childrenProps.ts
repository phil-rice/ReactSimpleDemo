export interface TwoChildrenProps {
    children: [JSX.Element, JSX.Element]
}

export interface ThreeChildrenProps {
    children: [JSX.Element, JSX.Element, JSX.Element]
}

export interface FourChildrenProps {
    children: [JSX.Element, JSX.Element, JSX.Element, JSX.Element],
    title1?: string,
    title2?: string
}
export interface SixChildrenProps {
    children: [JSX.Element, JSX.Element, JSX.Element, JSX.Element, JSX.Element, JSX.Element],
    title1?: string,
    title2?: string,
    title3?: string
}
