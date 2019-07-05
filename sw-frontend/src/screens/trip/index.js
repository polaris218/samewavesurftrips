import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Colors } from 'config'
import {
  Avatar,
  Button,
  Card,
  Container,
  Header,
  MastHead,
  Map,
  ScrollContainer,
  FootItem,
  Modal
} from 'components'
import { Tools, PickIcon } from 'utils'
import {
  Attendees,
  Trip,
  ContentContainer,
  Center,
  Stats,
  Stat
} from './styles'

const TripScreen = props => {
  const [ state, setState ] = useState({
    trip: {},
    loading: false,
    joined: false
  })
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ owner, setOwnerDetails ] = useState({ avatar: '' })
  const [ loading, setLoading ] = useState(true)
  const [ attendeeProfiles, setAttendeeProfiles ] = useState([])
  let mounted = true
  const attendeesTemp = []

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    // TODO: If not Current Trip prop, get via ID in URL
    setState({
      ...state,
      joined: checkTripStatus()
    })
    // Get latest Trip Owner details (avatar etc can change)
    fetchOwnerDetails()
    // Get details of all each attendee
    getAttendeeProfiles()
  }, [])

  const onJoinPress = (join = true) => {
    const data = {
      params: { id: props.trips.current.id },
      user: { _id: props.user.id }
    }
    let action = 'join'
    if (!join) action = 'leave'

    setState({
      ...state,
      loading: true,
      joined: join
    })

    dispatch(
      apiQuery(
        data,
        props.joinTrip,
        config.EndPoints.trip + `/${props.trips.current.id}/${action}`,
        onTripResult,
        'get'
      )
    )
    setModalVisible(false)
  }

  const fetchOwnerDetails = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.surferDetails,
        config.EndPoints.user + `/${props.trips.current.owner_id}`,
        onOwnerResult,
        'get'
      )
    )
  }

  const onOwnerResult = res => {
    setLoading(false)
    if (res.status !== 200) {
      console.log('fetch error', res)
    } else {
      setOwnerDetails(res.data)
    }
  }

  const onTripResult = () => {}

  const tripOwner = () => {
    // TODO: CHECK IF THE OWENER OF THE TRIP
    return Tools.renderIcon('pencil')
  }

  const onEditPress = () => {
    props.history.push('/' + Routes.EDIT_TRIP)
  }

  const checkTripStatus = () => {
    for (let i = 0; i < props.trips.current.attendees.length; i++) {
      if (props.trips.current.attendees[i] === props.user.id) {
        return true
      }
    }
    return false
  }

  const visitProfile = () => {
    props.history.push(`/${Routes.USER}/${trip.owner_id}`)
  }

  const joinButton = () =>
    new Date(trip.date_times.return_date_time) > new Date() && (
      <div className={'trip__join'}>
        {!state.joined ? (
          <Button
            onPress={() => setModalVisible(true)}
            title='JOIN THIS SURF TRIP'
          />
        ) : (
          <Button
            onPress={() => setModalVisible(true)}
            title='LEAVE THE TRIP'
            color={Colors.RED_BASE}
            hoverColor={Colors.RED_DARK}
          />
        )}
      </div>
    )

  const getAttendeeProfiles = () => {
    trip.attendees.forEach(attendee => {
      dispatch(
        apiQuery(
          null,
          props.attendeeDetail,
          config.EndPoints.user + `/${attendee}`,
          onAttendeeResult,
          'GET'
        )
      )
    })
  }

  const onAttendeeResult = res => {
    if (res.status !== 200) {
      console.log('attendee detail error', res)
    } else {
      attendeesTemp.push(res.data)
      mounted && setAttendeeProfiles([ ...attendeesTemp ])
    }
  }

  const onAttendeePress = id => {
    props.history.push(`/${Routes.USER}/${id}`)
  }

  const userAvatar = owner => {
    let image = ''
    if (owner.avatar) {
      if (owner.avatar.includes('https://')) return owner.avatar
      image = config.EndPoints.digitalOcean + owner.avatar
    }

    return image
  }

  const trip = props.trips.current
  console.log('WHO WE GOT? ', attendeeProfiles)

  return (
    <Trip>
      <ScrollContainer navbar={false}>
        <Header
          backButton
          homeButton={false}
          nav={false}
          rightIcon={trip.owner_id === props.user.id ? tripOwner() : null}
          rightAction={onEditPress}
        />
        <ContentContainer>
          <MastHead>
            <Map
              autoPosition={false}
              banner
              position={[ trip.destination.lng, trip.destination.lat ]}
              zoom={15}
              showMapCard={false}
            />
          </MastHead>
          <Center>
            <Container>
              <div className={'trip__avatar'} onClick={visitProfile}>
                <Avatar image={!loading ? userAvatar(owner) : ''} />
              </div>
              <div className={'trip__header-meta'}>
                <div className='trip__person' onClick={visitProfile}>
                  <p className={'trip__name'}>
                    {`${owner.first_name
                      ? owner.first_name
                      : ''} ${owner.last_name ? owner.last_name : ''}`}
                  </p>
                  <div className={'trip__location'}>
                    {Tools.renderIcon('pin')}{' '}
                    {owner.location && owner.location.name ? (
                      owner.location.name
                    ) : (
                      `Unknown User Location`
                    )}
                  </div>
                </div>
                {trip.owner_id !== props.user.id && (
                  <div className='trip__join-desktop'>{joinButton()}</div>
                )}
              </div>
              {trip.owner_id !== props.user.id && (
                <div className='trip__join-mobile'>{joinButton()}</div>
              )}
              <div className={'trip__card'}>
                <Card>
                  <div className={'trip__title'}>
                    {trip.title}
                    <div className={'trip__description'}>
                      {trip.trip_details}
                    </div>
                    {/* <div className={'trip__location-header'}>trip created: </div> */}
                  </div>
                </Card>
              </div>
              <div className={'trip__details'}>
                <div className={'trip__card'}>
                  <Card>
                    <div className={'trip__location-meta'}>
                      <div className={'trip__location-header'}>departing:</div>
                      <div className={'trip__location-place'}>
                        {trip.departing && trip.departing.name}
                      </div>
                      <div className={'trip__location-date'}>
                        {moment(
                          new Date(trip.date_times.departure_date_time)
                        ).format('ddd MMM Do')}
                      </div>
                    </div>
                    <div className={'trip__location-meta t-right'}>
                      <div className={'trip__location-header'}>
                        destination:
                      </div>
                      <div className={'trip__location-place'}>
                        {trip.destination && trip.destination.name}
                      </div>
                      <div className={'trip__location-date'}>
                        {moment(
                          new Date(trip.date_times.return_date_time)
                        ).format('ddd MMM Do')}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className={'trip__card'}>
                  <Card>
                    <Stats>
                      <div className={'trip__level'}>
                        <div>
                          {/* <div className={'trip__location-header'}>
                            recommended surf level:
                          </div> */}
                          <div className='trip__level-value'>
                            <img
                              src={PickIcon(trip.surf_level)}
                              alt={trip.surf_level}
                            />
                            <span>{trip.surf_level}</span>
                          </div>
                        </div>
                      </div>

                      <div className={'trip__level'}>
                        <div>
                          <div className='trip__level-value'>
                            <img
                              src={PickIcon(trip.surf_modality)}
                              alt={trip.surf_modality}
                            />
                            <span>{trip.surf_modality}</span>
                          </div>
                        </div>
                      </div>

                      <div className={'trip__level'}>
                        <div>
                          <div className='trip__level-value'>
                            <Stat>
                              {`${trip.attendees
                                .length}/${trip.number_of_surfers}`}
                            </Stat>
                            <span>attending</span>
                          </div>
                        </div>
                      </div>
                    </Stats>
                  </Card>
                </div>
                {trip.attendees.length > 0 && (
                  <div className={'trip__card'}>
                    <Card>
                      <div className={'trip__location-meta t-right'}>
                        <div className={'trip__location-header'}>
                          surfers going:
                        </div>
                        <Attendees>
                          {trip.attendees.map((attendee, i) => (
                            <Avatar
                              key={attendee}
                              onPress={
                                attendeeProfiles[i] ? (
                                  onAttendeePress.bind(
                                    null,
                                    attendeeProfiles[i]._id
                                  )
                                ) : (
                                  () => {}
                                )
                              }
                              image={
                                attendeeProfiles[i] ? (
                                  userAvatar(attendeeProfiles[i])
                                ) : (
                                  ''
                                )
                              }
                            />
                          ))}
                        </Attendees>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </Container>
          </Center>
          <FootItem />
        </ContentContainer>
      </ScrollContainer>
      <Modal
        visible={modalVisible}
        title={(!state.joined ? 'Join ' : 'Leave ') + trip.title}
        sub={
          !state.joined ? (
            'are you sure you want to be added to this trip?'
          ) : (
            'are you sure you want leave this trip?'
          )
        }
        buttonNo='CANCEL'
        buttonYes={!state.joined ? 'JOIN' : 'LEAVE'}
        onNoPress={() => setModalVisible(false)}
        onYesPress={!state.joined ? onJoinPress : onJoinPress.bind(this, false)}
      />
    </Trip>
  )
}

TripScreen.propTypes = {
  id: PropTypes.string,
  trip: PropTypes.object
}

TripScreen.defaultProps = {
  id: null,
  trip: {}
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(TripScreen))
