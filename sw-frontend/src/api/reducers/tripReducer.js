import StoreDefinitions from 'api/store/storeDefinitions'
import defaultValues from 'api/store/defaults'

export default function tripReducer (
  state = {
    ...defaultValues.trips
  },
  action
) {
  switch (action.type) {
    case StoreDefinitions.TRIP.CREATE:
      state = {
        ...state,
        current: action.payload
      }
      break
    case StoreDefinitions.TRIP.FETCH:
      state = {
        ...state,
        current: action.payload
      }
      break
    case StoreDefinitions.TRIP.FETCH_ALL:
      const trips = []

      action.payload.forEach(trip => {
        if (trip.destination.startsWith('{')) {
          trip.destination = JSON.parse(trip.destination)
          trip.departing = JSON.parse(trip.departing)
          if (new Date(trip.date_times.return_date_time) >= new Date()) {
            trips.push(trip)
          }
        }
      })

      state = {
        ...state,
        allTrips: trips,
        filter:"?"
      }
      break
    case StoreDefinitions.TRIP.FILTER:
      const filtedTrips = []
      action.payload.data.forEach(trip => {
        if (trip.destination.startsWith('{')) {
          trip.destination = JSON.parse(trip.destination)
          trip.departing = JSON.parse(trip.departing)
          if (new Date(trip.date_times.return_date_time) >= new Date()) {
            filtedTrips.push(trip)
          }
        }
      })

      state = {
        ...state,
        allTrips: filtedTrips,
        filter:"?"
      }
      break
    case StoreDefinitions.TRIP.FILTER_QUERY:
      state = {
        ...state,
        filter: action.payload,
        search: action.payload
      }
      break
    case StoreDefinitions.TRIP.FETCH_OWN:
      const yourtrips = []
      action.payload.forEach(trip => {
        if (trip.destination.startsWith('{')) {
          trip.destination = JSON.parse(trip.destination)
          trip.departing = JSON.parse(trip.departing)
          yourtrips.push(trip)
        }
      })

      state = {
        ...state,
        yourTrips: yourtrips
      }
      break
    case StoreDefinitions.TRIP.FETCH_USER:
      const usertrips = []
      action.payload.forEach(trip => {
        if (trip.destination.startsWith('{')) {
          trip.destination = JSON.parse(trip.destination)
          trip.departing = JSON.parse(trip.departing)
          usertrips.push(trip)
        }
      })

      state = {
        ...state,
        usertrips: usertrips
      }
      break
    case StoreDefinitions.TRIP.DELETE:
      state = {
        ...state
      }
      break
    case StoreDefinitions.TRIP.SET_CURRENT:
      state = {
        ...state,
        current: action.payload
      }
      break
      case StoreDefinitions.TRIP.SEARCH_PARAM:
        state = {
          ...state,
          filter: action.payload
        }
        break
    case StoreDefinitions.TRIP.JOIN:
      state = {
        ...state,
        current: {
          ...state.current,
          attendees: action.payload.attendees
        }
      }
      break
    case StoreDefinitions.TRIP.LEAVE:
      state = {
        ...state,
        current: {
          ...state.current,
          attendees: action.payload.attendees
        }
      }
      break
    default:
      state = {
        ...state
      }
  }
  return { ...state }
}
