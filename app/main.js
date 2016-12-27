import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './projects/store/store'
import configureStoreProd from './projects/store/store.prod'
import getRouter from './projects/router'

import '../build/lib/antd.min.css'
require('es6-promise').polyfill() // 异步请求promise必备

let store = configureStore()
if (__PRODUCTION__) {
  store = configureStoreProd()
}

const history = syncHistoryWithStore(browserHistory, store)

const router = getRouter(history)

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
)
