import { combineReducers } from "redux";
import user from "./userReducer";
import ad from "./adReducer";
const reducers = combineReducers({ user, ad });

export type State = ReturnType<typeof reducers>;
export default reducers;
