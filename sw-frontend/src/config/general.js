export const baseAPI = 'https://samewave.herokuapp.com/v1/'

export default {
  Root: '', // '/app/',
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
    digitalOcean: 'https://samewave.sfo2.digitaloceanspaces.com/'
  }

  // router.get(`/v1/user/:id/follow`, authenticate, User.follow);
  // router.get(`/v1/user/:id/unfollow`, authenticate, User.unfollow);
  // router.get(`/v1/user/:id/followers`, authenticate, User.followers);
}
