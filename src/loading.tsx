import React from "react";
import {SingleChildProps} from "./utils";

export interface LoadingProps {
    loading?: boolean
}
export function ShowLoading() {
    return (<p>Loading</p>)
}

export function Loading({children, loading}: SingleChildProps & LoadingProps) {
    return loading ? <ShowLoading/> : children;
}
