import { executeQuery, refreshToken } from 'api/services'
import { userActions } from 'api/actions'
import store from '../store'

export const apiQuery = (
  data,
  action,
  endpoint,
  callback,
  type,
  params,
  processData
) => {
  return dispatch => {
    return executeQuery(endpoint, data, type, processData)
      .then(response => {
        if (response && response.status === 200) {
          if (callback) callback(null)
          dispatch(action(response.data, params))
        } else {
          if (callback) callback(response.status)
        }
      })
      .catch(error => {
        console.log('1st Error', error)
        if (error.status === 401) {
          refreshToken(store.getState().user.refreshToken)
            .then(response => {
              dispatch(userActions().userTokenRefresh(response.data))
              // Now we rerun the same query with Tokens refreshed, otherwise bailout.
              executeQuery(endpoint, data, type, processData)
                .then(response => {
                  if (response && response.status === 200) {
                    if (callback) callback(null)
                    dispatch(action(response.data, params))
                  } else {
                    if (callback) callback(response.status)
                  }
                })
                .catch(error => {
                  console.log('Error', error)
                  if (callback) callback(error)
                })
            })
            .catch(error => {
              console.log('Refresh token error', error)
              if (callback) callback(error)
            })
        }
      })
  }
}
