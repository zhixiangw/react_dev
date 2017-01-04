import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { contract as contractAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const contractList4key1 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_1) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_1) {
        return state.merge({}, {
          doing: false,
          totalCount: 12,
          totalPageCount: 2,
          dataList: response.content || []
        })
      }
      return state

    default:
      return state
  }
}

const contractList4key2 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_2) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_2) {
        return state.merge({}, {
          doing: false,
          totalCount: 12,
          totalPageCount: 2,
          dataList: response.content || []
        })
      }
      return state

    default:
      return state
  }
}

const contractList4key3 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_3) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_3) {
        return state.merge({}, {
          doing: false,
          totalCount: 12,
          totalPageCount: 2,
          dataList: response.content || []
        })
      }
      return state

    default:
      return state
  }
}

const contractDetail = (state = Map({
  basicInfo: Map(),
  carsInfo: Map(),
  executiveInfo: Map()
}), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_DETAIL) {
        return state.merge({}, response)
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  contractList4key1,
  contractList4key2,
  contractList4key3,
  contractDetail
})

export default rootReducer
