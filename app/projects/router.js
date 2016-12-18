import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import Login from './containers/login'
import OverView from './containers/over-view'
import ContractList from './containers/contract-list'
import SomeThing from './containers/something'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/overView" component={PageContainer}>
          <IndexRoute component={OverView} />
      </Route>
      <Route path="/contractList" component={PageContainer}>
          <IndexRoute component={ContractList} />
      </Route>
      <Route path="/userManager" component={PageContainer}>
          <IndexRoute component={SomeThing} />
      </Route>
      <Route path="/systemSetting" component={PageContainer}>
          <IndexRoute component={SomeThing} />
      </Route>
    </Router>
  )
}
