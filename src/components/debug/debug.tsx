import {LensProps} from "@focuson/state";
import {Lenses} from "@focuson/lens";
import {OnePageDetails} from "../multipage/multiPage.domain";
import {LoadingProps} from "../loading/loading";


export function debugPageDetails<State>(): OnePageDetails<State, State> {
    return ({lens: Lenses.identity<State>('state'), pageFunction: Debug});
}
export function Debug<S>({state}: LensProps<S, S> & LoadingProps) {
    return (<pre>{JSON.stringify(state.json(), null, 2)}</pre>)
}