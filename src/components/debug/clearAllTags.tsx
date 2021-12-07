import {LensProps} from "@focuson/state";
import React from "react";
import {HasTagHolder} from "../../examples/common/common.domain";

export function ClearAllTags<S extends HasTagHolder>({state}: LensProps<S, S>) {
    return (<button onClick={() => state.focusOn('tags').setJson({})}>Clear All Tags</button>)

}