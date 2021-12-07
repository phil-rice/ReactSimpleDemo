import {LensProps} from "@focuson/state";


export interface ToggleButtonProps <S>extends LensProps<S, boolean>{
    title: string
}
export function ToggleButton<S>({state,title}: ToggleButtonProps<S>) {
    return (<button onClick={() => state.setJson(!state.optJson())}>{title}</button>)
}
