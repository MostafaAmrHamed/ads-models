import { Ad, User } from "../../types";
import ActionTypes from "../actionTypes";

type LoggedIn = {
  type: ActionTypes.LOGGEDIN;
  payload: User;
};
type LoggedOut = {
  type: ActionTypes.LOGGEDOUT;
  payload: boolean;
};
type CreateAd = {
  type: ActionTypes.CREATEAD;
  payload: Ad;
};
type UpdateAd = {
  type: ActionTypes.UPDATEAD;
  payload: Ad;
};
type DeleteAd = {
  type: ActionTypes.DELETEAD;
  payload: number;
};

export type userReducerAction = LoggedIn | LoggedOut;
export type adsReducerAction = CreateAd | UpdateAd | DeleteAd;
