import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import fetch from '../middlewares/fetch'

export default function configureStore(initialState = {}) {
  let finalCreateStore = compose(
    applyMiddleware(thunk, fetch),
    applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(createLogger({
      stateTransformer: state => state
    }))
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
