// reducers/itemReducer.js

import React from "react";
import {LOGIN, LOGOUT, ADMIN, USER}  from '../config/constants.js';



export const initialState = {
    login: false,
    admin: false,
    user: false,
    user_id: undefined,
}

export const reducer = (state, action) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, login: true, user_id: action.payload };
      case ADMIN:
        return { ...state, admin: true };
      case USER:
        return { ...state, user: true };
      case LOGOUT:
        return { ...state, login: false, admin: false, user: false  };
      default:
        return state;
    }
  }
  export const ReducerContext = React.createContext([])
