import {combineReducers} from "redux";
import alerts from "./alertsReducer";
import events from "./eventsReducer";
import user from "./userReducer";
import users from "./usersReducer";

export default combineReducers({
  alerts,
  events,
  user,
  users,
})
