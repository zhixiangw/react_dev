import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import Login from './containers/login'
import UserList from './containers/user-list'
import CashList from './containers/cash-list'
import OperationList from './containers/operation-list'

export default function (history) {
  return (
    <Router history={history}>
      <Route path={`${__STATIC_BASE__}/`} component={Login} />
      <Route path={`${__STATIC_BASE__}/userList`} component={PageContainer}>
        <IndexRoute component={UserList} />
      </Route>
      <Route path={`${__STATIC_BASE__}/cashList`} component={PageContainer}>
        <IndexRoute component={CashList} />
      </Route>
      <Route path={`${__STATIC_BASE__}/operationList`} component={PageContainer}>
        <IndexRoute component={OperationList} />
      </Route>
    </Router>
  )
}
