import {applyMiddleware, compose, createStore} from "redux";
import persistState from "redux-localstorage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "./reducers/reducers";

const middleware = applyMiddleware(promise(), thunk, logger());

const enhancer = compose(
  middleware,
  persistState('user') //allows to keep the user on refresh and accross tabs
);

export default createStore(reducer, enhancer);
