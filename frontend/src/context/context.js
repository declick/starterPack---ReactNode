import React from "react"
import { initialState, reducer, ReducerContext } from "../reducers/reducer"


const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <ReducerContext.Provider value={[state, dispatch]}>
            {children}
        </ReducerContext.Provider>
    )
}

export default Provider