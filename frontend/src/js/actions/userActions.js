import axios from "axios";
import querystring from "querystring";
import actions from "./actionTypes";

export function login(email, password) {
  return function (dispatch) {
    dispatch({type: actions.user.login.started});
    const config = {
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    };
    axios.post('/api/auth/login', querystring.stringify({username: email, password: password}), config)
      .then((response) => {
        dispatch({type: actions.user.login.fulfilled, payload: response.data.payload})
      })
      .catch((err) => {
        dispatch({type: actions.user.login.rejected, payload: err})
      })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({type: actions.user.logout.started});
    axios.get('/api/auth/logout')
      .then((response) => {
        dispatch({type: actions.user.logout.fulfilled, payload: response.data.payload});
        hashHistory.push('/route');
      })
      .catch((err) => {
        dispatch({type: actions.user.logout.rejected, payload: err})
      })
  }
}
