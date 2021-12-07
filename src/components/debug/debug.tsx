import {LensProps} from "@focuson/state";
import {Lenses} from "@focuson/lens";
import {OnePageDetails} from "../multipage/multiPage.domain";
import {LoadingProps} from "../loading/loading";


export function Debug<S>({state}: LensProps<S, boolean> & LoadingProps) {
    return state.optJson() ? (<pre>{JSON.stringify(state.main, null, 2)}</pre>) : <></>
}