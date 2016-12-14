import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './projects/store/store'
import getRouter from './projects/router'

import '../build/lib/antd.min.css'
require('es6-promise').polyfill() // 异步请求promise必备

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const router = getRouter(history)

render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
)
