export const baseAPI = 'https://samewave.herokuapp.com/v1/'

export default {
  Root: '/app/',
  MapboxToken:
    'pk.eyJ1IjoiZGVwcm9ncmFtIiwiYSI6ImNqMmJiZnVsbzAwdjYzM284NWhwMWlmZmcifQ.1zrQ2Kozur-dRTtSOKjyvA',
  APITimeout: 7000,
  EndPoints: {
    auth: baseAPI + 'auth',
    avatar: baseAPI + 'user/avatar',
    cover: baseAPI + 'user/cover',
    user: baseAPI + 'user',
    users: baseAPI + 'users',
    trips: baseAPI + 'trips',
    trip: baseAPI + 'trip',
    refresh: baseAPI + 'token',
    search: baseAPI + 'search/trips',
    messages: baseAPI + 'messages',
    digitalOcean: 'https://samewave.sfo2.digitaloceanspaces.com/'
  }
}
