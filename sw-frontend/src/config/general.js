export const baseAPI = 'https://app.samewavesurftrips.com/v1/'
// export const baseAPI = 'http://localhost:5000/v1/'

export default {
  Root: '/app/',
  MapboxToken:
    'pk.eyJ1IjoiZGVwcm9ncmFtIiwiYSI6ImNqMmJiZnVsbzAwdjYzM284NWhwMWlmZmcifQ.1zrQ2Kozur-dRTtSOKjyvA',
  APITimeout: 7000,
  GA_ID: process.env.REACT_APP_GA, // 'UA-143449129-2',
  EndPoints: {
    auth: baseAPI + 'auth',
    avatar: baseAPI + 'user/avatar',
    cover: baseAPI + 'user/cover',
    user: baseAPI + 'user',
    forgot: baseAPI + 'user/forgot',
    reset: baseAPI + 'user/reset-password',
    users: baseAPI + 'users',
    trips: baseAPI + 'trips',
    trip: baseAPI + 'trip',
    refresh: baseAPI + 'token',
    search: baseAPI + 'search/trips',
    messages: baseAPI + 'messages',
    messageGroup: baseAPI + 'message/trip',

    digitalOcean: 'https://samewave.sfo2.digitaloceanspaces.com/'
  }
}
