import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Colors } from 'config'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import {
  Avatar,
  Button,
  Card,
  Container,
  Footer,
  Header,
  MastHead,
  Tabs,
  ScrollContainer,
  FootItem,
  TripList,
  ProfileStat,
  Preloader
} from 'components'
import { Tools, PickIcon } from 'utils'
import {
  Profile,
  Center,
  ContentContainer,
  Stats,
  StatDivide,
  Interest,
  PreloadContainer,
  TabContainer,
  SurfIcons,
  SurfStat,
  Label
} from './styles'

const ProfileScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState('about')
  const [ tabTitles ] = useState([ 'About', 'Surf Trips' ])
  const [ userId ] = useState(props.match.params.userId)
  const [ following, setFollowing ] = useState(false)
  const [ followers, setFollowers ] = useState([])
  let mounted = true

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    fetchTrips()
    fetchUserDetails()
    onGetFollowers()
  }, [])

  const fetchTrips = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${userId ? userId : props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }

  const fetchUserDetails = () => {
    mounted && setLoading(true)
    dispatch(
      apiQuery(
        null,
        userId ? props.surferDetails : props.userDetails,
        config.EndPoints.user + `/${userId ? userId : props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }

  const onFetchResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    mounted && setLoading(false)
  }

  const onTabPress = value => {
    setActiveTab(tabTitles[value].toLowerCase())
  }

  const onEditPress = () => {
    props.history.push('/' + Routes.EDIT_PROFILE)
  }

  const activeTrips = () => {
    const trips = []
    props.trips.yourTrips.forEach(trip => {
      if (new Date(trip.date_times.return_date_time) > new Date()) {
        trips.push(trip)
      }
    })
    return trips
  }

  const onGetFollowers = () => {
    const endpoint = `${config.EndPoints.user}/${userId ||
      props.user.id}/followers`
    dispatch(
      apiQuery(null, props.userFollow, endpoint, onGetFollowersResult, 'GET')
    )
  }

  const onFollow = () => {
    const endpoint = `${config.EndPoints.user}/${userId ||
      props.user.id}/${!following ? 'follow' : 'unfollow'}`

    dispatch(
      apiQuery(null, props.userFollow, endpoint, onFollowersResult, 'GET')
    )
  }

  const onMessage = () => {}

  const onCall = () => window.open('tel:' + props.user.surfer.phone)

  const onGetFollowersResult = res => {
    if (res.status !== 200) {
      console.log('follow user error', res)
    } else {
      const cleanFollows = []
      res.data.forEach(user => {
        if (!cleanFollows.includes(user.follower_id)) {
          cleanFollows.push(user.follower_id)
        }
      })
      if (cleanFollows.includes(props.user.id)) setFollowing(true)
      mounted && setFollowers(cleanFollows)
    }
  }

  const onFollowersResult = res => {
    if (res.status !== 200) {
      console.log('follow user error', res)
    } else {
      mounted && setFollowing(!following)
      onGetFollowers()
    }
  }

  const user = userId ? props.user.surfer : props.user

  return (
    <Profile>
      <ScrollContainer height={'55px'}>
        <Header
          title={userId ? '' : 'Profile'}
          rightIcon={!userId && Tools.renderIcon('pencil')}
          rightAction={onEditPress}
          backButton={userId && true}
          homeButton={!userId}
        />

        {loading ? (
          <PreloadContainer>
            <Preloader />
          </PreloadContainer>
        ) : (
          <ContentContainer>
            <MastHead
              image={
                user && user.coverImg ? (
                  config.EndPoints.digitalOcean + user.coverImg
                ) : null
              }
            />
            <Center>
              <Container noPadd>
                <div className={'profile__avatar'}>
                  <Avatar
                    image={
                      user && user.avatar ? (
                        config.EndPoints.digitalOcean + user.avatar
                      ) : null
                    }
                  />
                </div>
                <div className={'profile__header-meta'}>
                  <div className='profile__person'>
                    <p className={'profile__name'}>
                      {user && user.firstName ? (
                        `${user.firstName} ${user.lastName}`
                      ) : (
                        'Your Name'
                      )}
                    </p>
                    <div className={'profile__location'}>
                      {Tools.renderIcon('pin')}{' '}
                      {user && user.location && user.location.name ? (
                        user.location.name
                      ) : (
                        `Unknown Location`
                      )}
                    </div>
                  </div>
                  {userId &&
                  userId !== props.user.id && (
                    <div className={'profile__contact'}>
                      <div className={'profile_follow'}>
                        <Button
                          color={
                            following ? Colors.GREY_LIGHT : Colors.ORANGE_BASE
                          }
                          hoverColor={
                            following ? Colors.GREY_BASE : Colors.ORANGE_DARK
                          }
                          onPress={onFollow}
                          title={!following ? 'Follow' : 'Following'}
                        />
                      </div>
                      <Button onPress={onMessage} title='Message' />
                      {props.user.surfer.phone && (
                        <a
                          href={`tel:${props.user.surfer.phone}`}
                          data-rel='external'>
                          <Button title='Call' />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Container>
              <Container noPadd>
                <Stats>
                  <ProfileStat
                    stat={props.trips.yourTrips.length}
                    label='SURF TRIPS'
                  />
                  <StatDivide />
                  <ProfileStat stat={followers.length} label='FOLLOWERS' />
                  <StatDivide />
                  <ProfileStat
                    stat={user && user.following}
                    label='FOLLOWING'
                  />
                </Stats>

                {userId &&
                userId !== props.user.id && (
                  <div className={'profile__contact_mobile'}>
                    <div className={'profile__follow'}>
                      <Button
                        color={
                          following ? Colors.GREY_LIGHT : Colors.ORANGE_BASE
                        }
                        hoverColor={
                          following ? Colors.GREY_BASE : Colors.ORANGE_DARK
                        }
                        onPress={onFollow}
                        title={!following ? 'Follow' : 'Following'}
                      />
                    </div>
                    <Button onPress={onMessage} title='Message' />
                    {props.user.surfer.phone && (
                      <a
                        href={`tel:${props.user.surfer.phone}`}
                        data-rel='external'>
                        <Button title='Call' />
                      </a>
                    )}
                  </div>
                )}
              </Container>
              <TabContainer>
                <Tabs
                  align='left'
                  backgroundColor='transparent'
                  tabs={tabTitles}
                  onTabPress={onTabPress}
                />
              </TabContainer>
              {activeTab === 'about' ? (
                <Container>
                  <div className={'profile__detail'}>
                    <div className={'profile__card'}>
                      <SurfIcons>
                        {user &&
                        user.surf_level && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.surf_level.toLowerCase())}
                              alt={user.surf_level}
                            />
                            <span>Skill Level</span>
                          </SurfStat>
                        )}
                        {user &&
                        user.stance && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.stance.toLowerCase())}
                              alt={user.stance}
                            />
                            <span>{user.stance}</span>
                          </SurfStat>
                        )}
                        {user &&
                        user.surf_modality && (
                          <SurfStat>
                            <img
                              src={PickIcon(user.surf_modality.toLowerCase())}
                              alt={user.surf_modality}
                            />
                            <span>{user.surf_modality}</span>
                          </SurfStat>
                        )}
                      </SurfIcons>
                      <Label>
                        Surfing Since:{' '}
                        {user &&
                          user.surfing_since &&
                          new Date(user.surfing_since).getFullYear()}
                      </Label>

                      <Card>
                        <div className={'profile__description'}>
                          <div className={'profile__location-header'}>bio:</div>
                          {user && user.bio ? (
                            `${user.bio}`
                          ) : (
                            'Add something interesting about yourself here'
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className={'profile__card'}>
                    <Card>
                      <div className={'profile__level'}>
                        <div>
                          <div className={'profile__location-header'}>
                            INTERESTS:
                          </div>
                          <div className={'profile_interests'}>
                            {user &&
                              user.interests &&
                              user.interests.length > 0 &&
                              user.interests.map(
                                item =>
                                  item !== '' && (
                                    <Interest key={item}>{item}</Interest>
                                  )
                              )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Container>
              ) : (
                <Container>
                  <div className={'profile__trips'}>
                    <TripList trips={activeTrips()} loading={loading} />
                  </div>
                </Container>
              )}
              <FootItem />
            </Center>
            <Footer />
          </ContentContainer>
        )}
      </ScrollContainer>
    </Profile>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(ProfileScreen))
