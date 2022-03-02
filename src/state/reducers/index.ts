import { combineReducers } from "redux";
import user from "./userReducer";

const reducers = combineReducers({ user });

export type State = ReturnType<typeof reducers>;
export default reducers;
