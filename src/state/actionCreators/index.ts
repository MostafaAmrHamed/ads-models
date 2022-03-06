import { Dispatch } from "react";
import { Ad, User } from "../../types";
import { adsReducerAction, userReducerAction } from "../action";
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
export const createAd = (ad: Ad) => {
  return (dispatch: Dispatch<adsReducerAction>) => {
    dispatch({
      type: ActionTypes.CREATEAD,
      payload: ad,
    });
  };
};
export const UpdateAd = (ad: Ad) => {
  return (dispatch: Dispatch<adsReducerAction>) => {
    dispatch({
      type: ActionTypes.UPDATEAD,
      payload: ad,
    });
  };
};
export const DeleteAd = (id: number) => {
  return (dispatch: Dispatch<adsReducerAction>) => {
    dispatch({
      type: ActionTypes.DELETEAD,
      payload: id,
    });
  };
};
