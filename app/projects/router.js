import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import Login from './containers/login'
import OverView from './containers/over-view'
import ContractList from './containers/contract-manage/contract-list'
import ContractDetail from './containers/contract-manage/contract-detail'
import SomeThing from './containers/something'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/overView" component={PageContainer}>
          <IndexRoute component={OverView} />
      </Route>
      <Route path="/contractManage" component={PageContainer}>
          <IndexRoute component={ContractList} />
          <Route path="detail" component={ContractDetail} />
      </Route>
      <Route path="/customerManage" component={PageContainer}>
          <IndexRoute component={SomeThing} />
      </Route>
      <Route path="/systemSetting" component={PageContainer}>
          <IndexRoute component={SomeThing} />
      </Route>
    </Router>
  )
}
