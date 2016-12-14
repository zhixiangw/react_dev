import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import PageContainer from '../components/page-container'
import HelloWord from './containers/hellow-world'
import SomeThing from './containers/something'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={PageContainer} >
        <IndexRoute component={HelloWord} />
        <Route path="/something" component={SomeThing} />
      </Route>
    </Router>
  )
}
