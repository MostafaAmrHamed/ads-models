import { Dispatch } from "react";
import { User } from "../../types";
import { userReducerAction } from "../action";
import ActionTypes from "../actionTypes";

export const loggedIn = (user: User) => {
  return (dispatch: Dispatch<userReducerAction>) => {
    dispatch({
      type: ActionTypes.LOGGEDIN,
      payload: user,
    });
  };
};
export const loggedOut = (loggedIn: boolean) => {
  return (dispatch: Dispatch<userReducerAction>) => {
    dispatch({
      type: ActionTypes.LOGGEDOUT,
      payload: loggedIn,
    });
  };
};
