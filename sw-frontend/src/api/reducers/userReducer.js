import StoreDefinitions from 'api/store/storeDefinitions'
import defaultValues from 'api/store/defaults'

export default function userReducer (
  state = {
    ...defaultValues.user
  },
  action
) {
  switch (action.type) {
    case StoreDefinitions.USER.LOGIN:
      state = {
        ...state,
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken,
        id: action.payload.user._id
      }
      break
    case StoreDefinitions.USER.REFRESH:
      state = {
        ...state,
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken,
        id: action.payload.user._id,
        refreshTokenPromise: null
      }
      break
    case StoreDefinitions.USER.REFRESH_START:
      state = {
        ...state,
        refreshTokenPromise: action.payload
      }
      break
    case StoreDefinitions.USER.REFRESH_STOP:
      state = {
        ...state,
        refreshTokenPromise: null
      }
      break
    case StoreDefinitions.USER.LOGOUT:
      state = {
        ...state,
        ...defaultValues.user,
        accessToken: null,
        id: null      }
      break
    case StoreDefinitions.USER.AVATAR:
      console.log('avatar action.payload', action.payload)
      state = {
        ...state
        // avatar: action.payload.avatar
      }
      break
    case StoreDefinitions.USER.EDIT:
      console.log('coverImg action', action.payload)
      state = {
        ...state,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email,
        bio: action.payload.bio,
        gender: action.payload.gender,
        avatar: action.payload.avatar,
        coverImg: action.payload.cover_image,
        location: action.payload.location,
        phone: action.payload.phone,
        surf_level: action.payload.surf_level,
        surf_modality: action.payload.surf_modality,
        stance: action.payload.stance,
        interests: action.payload.interests,
        surfing_since: action.payload.surfing_since,
        optIn: action.payload.optIn,
        following:action.payload.following.length
      }
      break
      case StoreDefinitions.USER.FORGOT:
      console.log('reducer forgot=', action.payload)
      state = {
        ...state,
        email: action.payload.email,
      }
      break
      case StoreDefinitions.USER.RESET:
      console.log('reducer Reset=', action.payload)
      state = {
        ...state,
        password: action.payload.password,
        token: action.payload.token
      }
      break
   
    case StoreDefinitions.USER.DETAILS:
      state = {
        ...state,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email,
        bio: action.payload.bio,
        gender: action.payload.gender,
        avatar: action.payload.avatar,
        coverImg: action.payload.cover_image,
        location: action.payload.location,
        phone: action.payload.phone,
        surf_level: action.payload.surf_level,
        surf_modality: action.payload.surf_modality,
        stance: action.payload.stance,
        interests: action.payload.interests,
        surfing_since: action.payload.surfing_since,
        optIn: action.payload.optIn,
        id: action.payload._id,
        following:action.payload.following
      }
      break
    case StoreDefinitions.USER.SURFER_DETAILS:
      state = {
        ...state,
        surfer: {
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          email: action.payload.email,
          bio: action.payload.bio,
          gender: action.payload.gender,
          avatar: action.payload.avatar,
          coverImg: action.payload.cover_image,
          location: action.payload.location,
          phone: action.payload.phone,
          surf_level: action.payload.surf_level,
          surf_modality: action.payload.surf_modality,
          stance: action.payload.stance,
          interests: action.payload.interests,
          surfing_since: action.payload.surfing_since,
          optIn: action.payload.optIn,
          id: action.payload._id,
        }
      }
      break
    case StoreDefinitions.USER.ALL_USERS:
      return state = {
        ...state,
        allUsers: action.payload,
      };
    case StoreDefinitions.USER.FOLLOWER:
      return state = {
        ...state,
        userFollowers: action.payload,
      };
    default:
      state = {
        ...state,
      }
  }
  return { ...state }
}
