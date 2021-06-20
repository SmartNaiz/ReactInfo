import { GET_PUMP_CTST } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PUMP_CTST:
      return action.payload;
    default:
      return state;
  }
}
