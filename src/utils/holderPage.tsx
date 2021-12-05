import {LensProps, LensState} from "@focuson/state";
import {Holder, Tags} from "@focuson/fetcher";


export function HolderNotLoaded(msg: string){return <p>{msg}</p>}
export function HolderPage<S, T, Element>(rawPage: (props: LensProps<S, T>) => Element, def: Element): (props: LensProps<S, Holder<Tags, T>>) => Element {
    return ({state}: LensProps<S, Holder<Tags, T>>) => {
        const tState: LensState<S, T> = state.focusOn('t')
        return tState ? rawPage({state: tState}) : def
    }
}