import actions from '../actionTypes'

export function showError(message) {
  return { type: actions.alerts.error, payload: message }
}

export function showSuccess(message) {
  return { type: actions.alerts.success, payload: message }
}

export function reset() {
  return { type: actions.alerts.reset }
}

