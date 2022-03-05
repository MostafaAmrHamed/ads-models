import { Ad } from "../../types";
import { adsReducerAction } from "../action";
import ActionTypes from "../actionTypes";

const initalState: Ad[] = [];
const ad = (state = initalState, action: adsReducerAction) => {
  switch (action.type) {
    case ActionTypes.CREATEAD:
      return (state = [...state, action.payload]);
    case ActionTypes.UPDATEAD:
      return state;
    case ActionTypes.DELETEAD:
      return state;
    default:
      return state;
  }
};

export default ad;
