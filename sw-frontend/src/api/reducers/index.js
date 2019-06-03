import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage

import generalReducer from './generalReducer'
import userReducer from './userReducer'
import tripReducer from './tripReducer'

const persistConfig = name => {
  return {
    key: 'sw_018_' + name,
    storage
    // blacklist: ['navigation'] // navigation will not be persisted
  }
}

const rootReducer = combineReducers({
  general: persistReducer(persistConfig('general'), generalReducer),
  user: persistReducer(persistConfig('user'), userReducer),
  trips: persistReducer(persistConfig('trips'), tripReducer)
})

export default rootReducer
