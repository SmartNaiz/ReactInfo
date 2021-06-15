import { GET_WATER_FLOW } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_WATER_FLOW:
      return action.payload;
    default:
      return state;
  }
}
