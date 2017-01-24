import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import Login from './containers/login'
import UserList from './containers/user-list'
import cashList from './containers/cash-list'

export default function (history) {
  return (
    <Router history={history}>
      <Route path={`${__STATIC_BASE__}/`} component={Login} />
      <Route path={`${__STATIC_BASE__}/userList`} component={PageContainer}>
        <IndexRoute component={UserList} />
      </Route>
      <Route path={`${__STATIC_BASE__}/cashList`} component={PageContainer}>
        <IndexRoute component={cashList} />
      </Route>
    </Router>
  )
}
