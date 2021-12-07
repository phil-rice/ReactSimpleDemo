export interface ULProps {
    children: JSX.Element[]
}

export function UL({children}: ULProps) {
    return (<ul>
        {children.map((child, i) => <li key={i}>{child}</li>)}
    </ul>)
}
