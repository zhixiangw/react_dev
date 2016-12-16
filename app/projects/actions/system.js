export const SHOW_ERROR = 'SHOW_ERROR'
export function error (msg) {
  return {
    type: SHOW_ERROR,
    msg
  }
}

export const SHOW_WARNING = 'SHOW_WARNING'
export function warning (msg) {
  return {
    type: SHOW_WARNING,
    msg
  }
}

export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export function success (msg) {
  return {
    type: SHOW_SUCCESS,
    msg
  }
}

export const MSG_CLEAN = 'MSG_CLEAN'
export function clean () {
  return {
    type: 'MSG_CLEAN'
  }
}
