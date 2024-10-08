import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; 

import { authReducer } from "./Auth/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
});

export const Store = legacy_createStore(rootReducers, applyMiddleware(thunk));
