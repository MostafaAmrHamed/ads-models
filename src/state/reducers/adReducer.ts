import { Ad } from "../../types";
import { adsReducerAction } from "../action";
import ActionTypes from "../actionTypes";

const initalState: Ad[] = [];
const ad = (state = initalState, action: adsReducerAction) => {
  switch (action.type) {
    case ActionTypes.CREATEAD:
      const newAd: Ad = {
        id: state.length,
        title: action.payload.title,
        type: action.payload.type,
        link: action.payload.link,
        from: action.payload.from,
        to: action.payload.to,
      };
      return (state = [...state, newAd]);
    case ActionTypes.UPDATEAD:
      return state;
    case ActionTypes.DELETEAD:
      return state;
    default:
      return state;
  }
};

export default ad;
