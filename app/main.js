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
import { Upload, Button, Icon } from 'antd';
const history = syncHistoryWithStore(browserHistory, store)

const router = getRouter(history)
const props = {
  name: 'file',
  action: 'http://localhost:3100/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`)
    }
  },
}
render(
  <Upload {...props}>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>,
  document.getElementById('app')
)
