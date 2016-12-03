import axios from "axios";

export function fetchEvents() {
  return function (dispatch) {
    axios.get("/api/test")
      .then((response) => {
        dispatch({type: "FETCH_EVENTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
      })
  }
}

export function addEvent(id, text) {
  return {
    type: 'ADD_EVENT',
    payload: {
      id,
      text,
    },
  }
}

export function updateEvent(id, text) {
  return {
    type: 'UPDATE_EVENT',
    payload: {
      id,
      text,
    },
  }
}

export function deleteEvent(id) {
  return {type: 'DELETE_EVENT', payload: id}
}
