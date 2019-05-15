import { createStore, compose } from 'redux'
import { persistStore } from 'redux-persist'
import middleware from 'api/middleware'
import reducers from 'api/reducers'

const store = createStore(
  reducers,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

export const persistor = persistStore(store)
export const dispatch = store.dispatch

export default store
