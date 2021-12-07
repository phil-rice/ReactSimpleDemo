import {LensProps} from "@focuson/state";


export function Debug<S>({state}: LensProps<S, boolean> ) {
    return state.optJson() ? (<pre>{JSON.stringify(state.main, null, 2)}</pre>) : <></>
}