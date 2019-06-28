const TRIP = {
  owner_id: null,
  title: '',
  departing: '',
  destination: '',
  date_times: {
    departure_date_time: null,
    return_date_time: null
  },
  number_of_surfers: null,
  gender: '',
  surf_modality: '',
  surf_level: '',
  // transport: {
  //     own_vehicle: null,
  //     offer_rides: null,
  //     available_seats: null,
  //     bring_own_surfboards: null,
  //     max_surfboards: null
  // },
  transport: '',
  accomodation: '',
  offering_rides: false,
  available_seats: 0,
  trip_details: ''
}

export default {
  general: {},
  user: {
    accessToken: null,
    refreshToken: null,
    refreshTokenPromise: null,
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    bio: null,
    gender: null,
    avatar: null,
    coverImg: null,
    location: null,
    phone: null,
    surf_level: null,
    surf_modality: null,
    stance: null,
    interests: [],
    surfing_since: null,
    optIn: false,
    followers: 0,
    following: 0
  },
  trips: {
    current: TRIP,
    allTrips: [],
    yourTrips: [],
    filter: '?'
  }
}
