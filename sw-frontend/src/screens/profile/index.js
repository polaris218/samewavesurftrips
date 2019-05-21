import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes } from 'config'
import { userActions, mapDispatchToProps } from 'api/actions'
import {
  Avatar,
  Card,
  Container,
  Header,
  MastHead,
  Tabs,
  ScrollContainer,
  FootItem,
  TripList,
  ProfileStat
} from 'components'
import { Tools } from 'utils'
import coverImg from 'assets/images/profile_bg.jpg'
import { Profile, Center, ContentContainer, Stats, StatDivide } from './styles'

const ProfileScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ activeTab, setActiveTab ] = useState('about')
  const [ tabTitles ] = useState([ 'About', 'Surf Trips' ])

  useEffect(() => {
    fetchTrips()
    fetchUserDetails()
  }, [])

  const fetchTrips = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }

  const fetchUserDetails = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.userDetails,
        config.EndPoints.user + `/${props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }

  const onFetchResult = error => {
    if (error) {
      console.log('what error', error)
    }
    setLoading(false)
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

  const { user } = props

  return (
    <Profile>
      <ScrollContainer>
        <Header
          title={'Profile'}
          rightIcon={Tools.renderIcon('pencil')}
          rightAction={onEditPress}
        />
        <ContentContainer>
          <MastHead
            image={
              user.coverImg ? (
                config.EndPoints.digitalOcean + user.coverImg
              ) : null
            }
          />
          <Center>
            <Container>
              <div className={'profile__avatar'}>
                <Avatar
                  image={
                    user.avatar ? (
                      config.EndPoints.digitalOcean + user.avatar
                    ) : null
                  }
                />
              </div>
              <div className={'profile__header-meta'}>
                <p className={'profile__name'}>
                  {user.firstName ? (
                    `${user.firstName} ${user.lastName}`
                  ) : (
                    'Your Name'
                  )}
                </p>
                <div className={'profile__location'}>
                  {Tools.renderIcon('pin')}{' '}
                  {user.location ? user.location : `Your Location`}
                </div>
              </div>
            </Container>
            <Container>
              <Stats>
                <ProfileStat
                  stat={props.trips.yourTrips.length}
                  label='SURF TRIPS'
                />
                <StatDivide />
                <ProfileStat stat={props.user.followers} label='FOLLOWERS' />
                <StatDivide />
                <ProfileStat stat={props.user.following} label='FOLLOWING' />
              </Stats>
            </Container>
            <Tabs
              align='left'
              backgroundColor='transparent'
              tabs={tabTitles}
              onTabPress={onTabPress}
            />
            {activeTab === 'about' ? (
              <Container>
                <div className={'profile__detail'}>
                  <div className={'profile__card'}>
                    <Card>
                      <div className={'profile__description'}>
                        <div className={'profile__location-header'}>bio:</div>
                        {user.bio ? (
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
                      {/* <div className={'profile__icon'}>
                        {Tools.renderIcon('surferMale')}
                      </div> */}
                      <div>
                        <div className={'profile__location-header'}>
                          INTERESTS:
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
        </ContentContainer>
      </ScrollContainer>
    </Profile>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(ProfileScreen))
