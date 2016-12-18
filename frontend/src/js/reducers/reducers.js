import {combineReducers} from "redux";
import alerts from "./alertsReducer";
import events from "./eventsReducer";
import user from "./userReducer";

export default combineReducers({
  alerts,
  events,
  user,
})
