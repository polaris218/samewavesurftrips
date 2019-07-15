import {
  executeQuery,
  refreshToken
} from 'api/services'
import {
  userActions
} from 'api/actions'
import store from '../store'

const runQuery = (endpoint, data, type, processData, dispatch, action, callback, params) => {
  return executeQuery(endpoint, data, type, processData).then(response => {
    if (response && response.status === 200) {
      if (callback) callback(response)
      dispatch(action(response.data, params))
    } else {
      if (callback) callback(response)
    }
  })
}

export const apiQuery = (data, action, endpoint, callback, type, params, processData) => {
  return dispatch => {
    return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(async error => {
      console.log('1st Error', error)
      if (error.status === 401) {
        if (store.getState().user.refreshTokenPromise) {
          await store.getState().user.refreshTokenPromise

          // Now we rerun the same query with Tokens refreshed, otherwise bailout.
          return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(error => {
            console.log('Error', error)
            if (callback) callback(error)
          })
        }

        const refreshTokenPromise = refreshToken()
          .then(response => {
            console.log('Refresh Response', response)
            if (!response) {
              return userActions(dispatch).userLogout()
            }
            dispatch(userActions().userTokenRefresh(response.data))
            // Now we rerun the same query with Tokens refreshed, otherwise bailout.
            runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(error => {
              console.log('Error', error)
              if (callback) callback(error)
            })
          })
          .catch(error => {
            console.log('Refresh token error', error)
            userActions(dispatch).userLogout()
            if (callback) callback(error)
          })

        dispatch(userActions().userTokenRefreshStart(refreshTokenPromise))
      }
    })
  }
}

export const apiSingleQuery = (data, action, endpoint, callback, type, params, processData) => {  
  return dispatch => {    
    return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(async error => {
      console.log('Query Error', error)
      if (callback) callback(error)
      return error.status
    })
  }
}

export const apiForgotQuery = (data, action, endpoint, callback, type, params, processData) => {
  return dispatch => {
    return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(async error => {
      if (callback) callback(error)
      return error.status;
    })
  }
}
export const apiResetQuery = (data, action, endpoint, callback, type, params, processData) => {
  return dispatch => {  
    return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(async error => {
      if (callback) callback(error)
      return error.status;
    })
  }
}
export const apiMsgUpdate= (data, action, endpoint, callback, type, params, processData) => {
  return dispatch => {  
    return runQuery(endpoint, data, type, processData, dispatch, action, callback, params).catch(async error => {
      if (callback) callback(error)
      return error.status;
    })
  }
}