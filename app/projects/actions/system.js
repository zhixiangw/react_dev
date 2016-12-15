export function error (msg) {
  return {
    type: 'show_error',
    msg
  }
}

export function clean () {
  return {
    type: 'msg_clean'
  }
}
