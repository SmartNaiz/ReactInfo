import { GET_WORKED_TIME } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_WORKED_TIME:
      return action.payload;
    default:
      return state;
  }
}
