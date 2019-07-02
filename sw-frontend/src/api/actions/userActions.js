import StoreDefinitions from 'api/store/storeDefinitions'

export function userActions (dispatch) {
  return {
    userLogin: credentials => {
      return {
        type: StoreDefinitions.USER.LOGIN,
        payload: credentials
      }
    },
    userLoginFB: credentials => {
      console.log('credentials', credentials)
      dispatch({
        type: StoreDefinitions.USER.LOGIN,
        payload: credentials
      })
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
    userFollow: credentials => {
      return {
        type: StoreDefinitions.USER.FOLLOW,
        payload: credentials
      }
    },
    userImageUpload: data => {
      return {
        type: StoreDefinitions.USER.IMAGE_UPLOAD,
        payload: data
      }
    },
    getMessages: msgs => {
      return {
        type: StoreDefinitions.USER.GET_MESSAGES,
        payload: msgs
      }
    },
    sendMessage: msg => {
      return {
        type: StoreDefinitions.USER.SEND_MESSAGE,
        payload: msg
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
    usersListDetails: users => {
      return {
        type: StoreDefinitions.USER.USERS_LIST_DETAILS,
        payload: users
      }
    },
    userTokenRefresh: token => {
      return {
        type: StoreDefinitions.USER.REFRESH,
        payload: token
      }
    },
    userTokenRefreshStart: promise => {
      return {
        type: StoreDefinitions.USER.REFRESH_START,
        payload: promise
      }
    },
    userTokenRefreshStop: () => {
      return {
        type: StoreDefinitions.USER.REFRESH_STOP
      }
    }
  }
}
