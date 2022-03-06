import { Ad } from "../../types";
import { adsReducerAction } from "../action";
import ActionTypes from "../actionTypes";

const initalState: Ad[] = [];
const ad = (state = initalState, action: adsReducerAction) => {
  switch (action.type) {
    case ActionTypes.CREATEAD:
      const newAd: Ad = {
        id: Date.now(),
        title: action.payload.title,
        type: action.payload.type,
        link: action.payload.link,
        from: action.payload.from,
        to: action.payload.to,
      };
      return (state = [...state, newAd]);
    case ActionTypes.UPDATEAD:
      // let index = state.find((ad) => ad.id === action.payload.id);
      // state[] =
      return state;
    case ActionTypes.DELETEAD:
      const newAds = state.filter((ad) => {
        return ad.id !== action.payload;
      });
      return (state = newAds);
    default:
      return state;
  }
};

export default ad;
