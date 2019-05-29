import StoreDefinitions from 'api/store/storeDefinitions'

export function userActions (dispatch) {
  return {
    userLogin: credentials => {
      return {
        type: StoreDefinitions.USER.LOGIN,
        payload: credentials
      }
    },
    userLogout: () => {
      dispatch({
        type: StoreDefinitions.USER.LOGOUT,
        payload: {
          accessToken: null,
          id: null
        }
      })
    },
    userSignup: credentials => {
      return {
        type: StoreDefinitions.USER.SIGNUP,
        payload: credentials
      }
    },
    avatarUpload: data => {
      return {
        type: StoreDefinitions.USER.AVATAR,
        payload: data
      }
    },
    userEdit: user => {
      return {
        type: StoreDefinitions.USER.EDIT,
        payload: user
      }
    },
    userDetails: userId => {
      return {
        type: StoreDefinitions.USER.DETAILS,
        payload: userId
      }
    },
    surferDetails: userId => {
      return {
        type: StoreDefinitions.USER.SURFER_DETAILS,
        payload: userId
      }
    },
    userTokenRefresh: token => {
      return {
        type: StoreDefinitions.USER.REFRESH,
        payload: token
      }
    }
  }
}
