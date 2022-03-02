import { User } from "../../types";
import ActionTypes from "../actionTypes";

type LoggedIn = {
  type: ActionTypes.LOGGEDIN;
  payload: User;
};
type LoggedOut = {
  type: ActionTypes.LOGGEDOUT;
  payload: boolean;
};

export type userReducerAction = LoggedIn | LoggedOut;
