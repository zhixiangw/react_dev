import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import fetch from '../middlewares/fetch'

export default function configureStore(initialState = {}) {
  let finalCreateStore = compose(
    applyMiddleware(thunk, fetch),
    applyMiddleware(routerMiddleware(browserHistory))
  )(createStore);

  return finalCreateStore(rootReducer, initialState)
}

