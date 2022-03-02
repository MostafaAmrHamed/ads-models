import { User } from "../../types";
import { userReducerAction } from "../action";
import ActionTypes from "../actionTypes";

const initalState: User = {
  name: "",
  email: "",
  phone: "",
  role: "",
  loggedIn: false,
};
const user = (state = initalState, action: userReducerAction) => {
  switch (action.type) {
    case ActionTypes.LOGGEDIN:
      return (state = action.payload);

    case ActionTypes.LOGGEDOUT:
      return (state = { ...initalState, loggedIn: action.payload });
    default:
      return state;
  }
};
export default user;
