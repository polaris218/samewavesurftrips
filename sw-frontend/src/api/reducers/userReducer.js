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
        id: action.payload.user._id
      }
      break
    case StoreDefinitions.USER.LOGOUT:
      state = {
        ...state,
        accessToken: null,
        id: null
      }
      break
    case StoreDefinitions.USER.AVATAR:
      console.log('avatar action.payload', action.payload)
      state = {
        ...state
        // avatar: action.payload.avatar
      }
      break
    case StoreDefinitions.USER.EDIT:
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
        optIn: action.payload.optIn
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
        optIn: action.payload.optIn
      }
      break
    default:
      state = {
        ...state
      }
  }
  return { ...state }
}
