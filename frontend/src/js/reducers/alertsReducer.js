import actions from "../actions/actionTypes";

export default function reducer(state = {
  error: '',
  success: ''
}, action) {

  switch (action.type) {
    case actions.alerts.error: {
      return {
        ...state,
        error: action.payload
      }
    }
    case actions.alerts.success: {
      return {
        ...state,
        success: action.payload
      }
    }
    case actions.alerts.reset: {
      return {
        error: '',
        success: ''
      }
    }
  }

  return state
}
