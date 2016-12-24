import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { user as userAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const userList4key1 = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response, request }) => {
  const dataList = [{
    id: '1003569',
    clerkAccount: '18899991111',
    clerkName: '业务员一',
    assignedContractNumb: '109',
    contractIn: '10'
  }, {
    id: '1003569',
    clerkAccount: '18899992222',
    clerkName: '业务员二',
    assignedContractNumb: '129',
    contractIn: '12'
  }, {
    id: '1003569',
    clerkAccount: '18899993333',
    clerkName: '业务员三',
    assignedContractNumb: '139',
    contractIn: '10'
  }, {
    id: '1003569',
    clerkAccount: '18899991111',
    clerkName: '业务员四',
    assignedContractNumb: '139',
    contractIn: '13'
  }, {
    id: '1003569',
    clerkAccount: '18899991111',
    clerkName: '业务员五',
    assignedContractNumb: '159',
    contractIn: '14'
  },]
  switch (type) {
    case API_REQUEST:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_1) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_1) {
        return state.merge({}, {
          doing: false,
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const userList4key2 = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response, request }) => {
  const dataList = [{
    id: '1003569',
    verifyAccount: '18899991111',
    verifyName: '审核员一',
    entryContract: '109'
  }, {
    id: '1003569',
    verifyAccount: '18899992222',
    verifyName: '审核员二',
    entryContract: '129'
  }, {
    id: '1003569',
    verifyAccount: '18899993333',
    verifyName: '审核员三',
    entryContract: '139'
  }, {
    id: '1003569',
    verifyAccount: '18899991111',
    verifyName: '审核员四',
    entryContract: '139'
  }, {
    id: '1003569',
    verifyAccount: '18899991111',
    verifyName: '审核员五',
    entryContract: '159'
  },]
  switch (type) {
    case API_REQUEST:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_2) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_2) {
        return state.merge({}, {
          doing: false,
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userList4key1,
  userList4key2
})

export default rootReducer
