import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Provider} from "react-redux"

import Archives from "./pages/Archives";
import Featured from "./pages/Home";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import store from "./store"

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Featured}></IndexRoute>
        <Route path="archives(/:article)" name="archives" component={Archives}></Route>
        <Route path="settings" name="settings" component={Settings}></Route>
      </Route>
    </Router>
  </Provider>
  , app);
