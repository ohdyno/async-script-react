import React, {Reducer, useReducer} from "react";
import Child from "./Child";

export interface AppState {
    text: string,
    childText: string
}

export const defaultInitialState: AppState = {text: 'data', childText: 'child component text'};
const defaultReducer: Reducer<AppState, Action> = (state, action) => {
    switch (action.type) {
        case 'button pressed':
            return {...state, childText: 'child button clicked'}
        default:
            return {...state, text: action.payload};
    }
}

export type Action =
    | { type: 'text typed', payload: string }
    | { type: 'button pressed'}

export const createAction = (payload: string): Action => ({
    type: 'text typed',
    payload: payload
});

function App({initialState = defaultInitialState, reducer = defaultReducer}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const selectAll = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const updateState = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createAction(event.target.value))
        event.preventDefault();
    };

    return (
        <div>
            <label>Input:
                <input value={state.text} onFocus={selectAll} onChange={updateState}/>
            </label>
            <Child state={{text: state.childText}} dispatch={dispatch}/>
        </div>
    );
}

export default App;
