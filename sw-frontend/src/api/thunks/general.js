import { executeQuery, refreshToken } from 'api/services'
import { userActions } from 'api/actions'
// import store from '../store'

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
          if (callback) callback(response)
          dispatch(action(response.data, params))
        } else {
          if (callback) callback(response)
        }
      })
      .catch(error => {
        console.log('1st Error', error)
        if (error.status === 401) {
          refreshToken()
            .then(response => {
              console.log('Refresh Response', response)
              dispatch(userActions().userTokenRefresh(response.data))
              // Now we rerun the same query with Tokens refreshed, otherwise bailout.
              executeQuery(endpoint, data, type, processData)
                .then(response => {
                  if (response && response.status === 200) {
                    if (callback) callback(response)
                    dispatch(action(response.data, params))
                  } else {
                    if (callback) callback(response)
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
