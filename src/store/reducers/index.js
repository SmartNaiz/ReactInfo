import { combineReducers } from "redux";
import auth from "./auth";
import reviews from "./reviews";
import waterFlow from "./waterFlow";
import waterSan from "./waterSan";
import workedTime from "./workedTime";
import waterAlarm from "./waterAlarm";
import pumpCtSt from "./pumpCtSt";
const appReducers = combineReducers({
  auth,
  reviews,
  waterFlow,
  waterSan,
  workedTime,
  waterAlarm,
  pumpCtSt,
});

export default appReducers;
