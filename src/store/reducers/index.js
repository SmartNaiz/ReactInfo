import { combineReducers } from "redux";
import auth from "./auth";
import reviews from "./reviews";
import waterFlow from "./waterFlow";
import waterSan from "./waterSan";
import workedTime from "./workedTime";
const appReducers = combineReducers({
  auth,
  reviews,
  waterFlow,
  waterSan,
  workedTime,
});

export default appReducers;
