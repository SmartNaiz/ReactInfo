import { GET_WATER_ALARM } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_WATER_ALARM:
      return action.payload;
    default:
      return state;
  }
}
