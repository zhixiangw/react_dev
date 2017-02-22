import { combineReducers } from 'redux'
import Immutable, { Map, List } from 'immutable'
import { sd as sdAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const sdList = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === sdAction.QUERY_SD_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === sdAction.QUERY_SD_LIST) {
        return state.merge({}, {
          doing: false,
          totalCount: 0,
          totalPageCount: 0,
          dataList: response && Immutable.fromJS(response) || List()
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  sdList
})

export default rootReducer
