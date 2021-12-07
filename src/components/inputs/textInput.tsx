import {textChangedEvent} from "../../utils/utils";
import React from "react";
import {LensProps} from "@focuson/state";

interface NotATableHonestProps {
    children: React.ReactNode;
}
export function NotATableHonest({children}: NotATableHonestProps) {
    return (<dl className="table-display">{children}</dl>)
}

interface TitleAndTextInputProps<S> extends LensProps<S, string> {
    title: string
}
export function TitleAndTextInput<S>({title, state}: TitleAndTextInputProps<S>) {
    return (<>
        <dd>{title}</dd>
        <dt><TextInput id={title} state={state}/></dt>
    </>)

}

interface TextInputProps<S> extends LensProps<S, string> {
    id: string
}
export function TextInput<S>({id, state}: TextInputProps<S>) {
    function onChange(s?: string) { if (s) state.setJson(s)}
    return (<input id={id} type='text' onKeyPress={textChangedEvent(id, onChange)} onBlur={e => onChange(e.target?.value)} defaultValue={state.json()}/>)
}