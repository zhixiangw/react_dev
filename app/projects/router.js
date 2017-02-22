import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import Login from './containers/login'
import OverView from './containers/over-view'
import SdList from './containers/sd-manage/sd-list'
import SdDetail from './containers/sd-manage/sd-detail'
import UserList from './containers/user-manage'
import SystemSetting from './containers/system-setting'

export default function (history) {
  return (
    <Router history={history}>
      <Route path={`${__STATIC_BASE__}/`} component={Login} />
      <Route path={`${__STATIC_BASE__}/overView`} component={PageContainer}>
        <IndexRoute component={OverView} />
      </Route>
      <Route path={`${__STATIC_BASE__}/sdManage`} component={PageContainer}>
        <IndexRoute component={SdList} />
        <Route path="detail" component={SdDetail} />
      </Route>
      <Route path={`${__STATIC_BASE__}/customerManage`} component={PageContainer}>
        <IndexRoute component={UserList} />
      </Route>
      <Route path={`${__STATIC_BASE__}/systemSetting`} component={PageContainer}>
        <IndexRoute component={SystemSetting} />
      </Route>
    </Router>
  )
}
