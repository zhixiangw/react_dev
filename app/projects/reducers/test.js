import { combineReducers } from 'redux'
import Immutable, { Map } from 'immutable'
import { test as testAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const testFetch = (
  state = Map({
    data: {},
    doing: false
  }), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === testAction.TEST_FETCH) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === testAction.TEST_FETCH) {
        return Immutable.fromJS({
          doing: false,
          data: response
        })
      }
      return state

    default:
      return state
  }
}
const rootReducer = combineReducers({
  testFetch
})

export default rootReducer
