import React from 'react'
import { render } from 'react-dom'

import HelloWorld from './components/hellow-world'
import '../build/lib/antd.min.css'
render(
  <HelloWorld />,
  document.getElementById('app')
)
