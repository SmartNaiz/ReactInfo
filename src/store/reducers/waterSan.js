import { GET_WATER_SAN } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_WATER_SAN:
      return action.payload;
    default:
      return state;
  }
}
