import {Dispatch} from "react";
import {Action} from "@/components/App";

type ChildState = {
    text: string
}

type ChildProps = {
    state: ChildState,
    dispatch: Dispatch<Action>
}

function Child({state, dispatch}: ChildProps) {
    return (
        <div>
            <p>{state.text}</p>
            <button onClick={() => dispatch({type: 'button pressed'})}>button</button>
        </div>
    )
}

export default Child;
