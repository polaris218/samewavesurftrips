import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactGA from 'react-ga'
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
  ScrollContainer,
  FootItem,
  Modal
} from 'components'
import { Tools } from 'utils'
import {
  Attendees,
  Trip,
  ContentContainer,
  Center,
  TripDivider,
  Directions,
  Row,
  NoJoin
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

    // Record Activity in GA
    ReactGA.event({
      category: 'Trip',
      action: `User ${join ? 'joined' : 'left'} a surftrip`,
      label: `${props.trips.current.id}`
    })

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
    return Tools.renderIcon('share')
  }

  const onEditPress = () => {
    props.history.push('/' + Routes.EDIT_TRIP)
  }

  const onSharePress = () => {
    navigator.share &&
      navigator.share({
        title: document.title,
        text: 'Check out this Same Wave Surf Trip',
        url: window.location.href
      })
  }

  const checkTripStatus = () => {
    if (props.trips.current.attendees) {
      for (let i = 0; i < props.trips.current.attendees.length; i++) {
        if (props.trips.current.attendees[i] === props.user.id) {
          return true
        }
      }
    }
    return false
  }

  const visitProfile = () => {
    props.user.accessToken && props.history.push(`/${Routes.USER}/${trip.owner_id}`)
  }

  const joinButton = () =>
    new Date(trip.date_times.return_date_time) > new Date() && (
      <div className={'trip__join'}>
        {!state.joined ? (
          <Button
            onPress={() => setModalVisible(true)}
            title='JOIN SURF TRIP'
          />
        ) : (
          <Row>
          <Button
            onPress={() => setModalVisible(true)}
            title='LEAVE SURF TRIP'
            color={Colors.RED_BASE}
            hoverColor={Colors.RED_DARK}
          />
          <Button
            onPress={onMessageUser}
            title='MESSAGE SURFERS'
          />
          </Row>
        )}
      </div>
    )

  const editButton = () => (
    <div className={'trip__join'}>
      <Row>
      <Button
        color={Colors.GREY_BASE}
        onPress={onEditPress}
        title='EDIT SURF TRIP'
      />
      <Button
          onPress={onMessageUser}
          title='MESSAGE SURFERS'
        />
      </Row>
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

  const onMessageUser = () => {
    props.history.push(`/message/null?group=${trip.id}`)
  }

  const trip = props.trips.current

  return (
    <Trip>
      <ScrollContainer navbar={false} color='transparent'>
        <Header
          title='SURF TRIP DETAILS'
          backButton
          homeButton={false}
          nav={false}
          rightIcon={tripOwner()}
          rightAction={onSharePress}
          rightIconStyle={{width: 20, height: 20, paddingTop: 3}}
        />
        <ContentContainer>
          <Center>
            <div className={'trip__location-header-top'}>
              SURF TRIP ORGANIZER
            </div>
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
              </div>

              <Card>
                <div className={'trip__card'}>
                  <div className={'trip__title'}>
                    <div className={'trip__description'}>
                      {trip.trip_details && `"${trip.trip_details}"`}
                    </div>
                  </div>
                </div>
                <div className={'trip__details'}>
                  <div className={'trip__card'}>
                    <div className={'trip__location-meta'}>
                      <div className={'trip__location-header'}>route</div>
                      <Directions><a 
                href={`https://maps.google.com?saddr=${trip.departing.lat},${trip.departing.lng}&daddr=${trip.destination.lat},${trip.destination.lng}`}
                target="_blank" rel="noopener noreferrer"
              >VIEW ROUTE IN MAP <span>{Tools.renderIcon('chevron')}</span></a> </Directions>
                      <div className={'trip__location-place'}>
                        {trip.departing && trip.departing.name}
                      </div>
                      <div className={'trip__location-date'}>
                        {moment(
                          new Date(trip.date_times.departure_date_time)
                        ).format('ddd MMM Do')}
                      </div>
                    </div>
                    <TripDivider>
                      <div className={'trip__divider-start'} />
                      <div className={'trip__divider-rule'} />
                      <div className={'trip__divider-end'} />
                    </TripDivider>
                    <div className={'trip__location-meta t-right'}>
                      <div className={'trip__location-place'}>
                        {trip.destination && trip.destination.name}
                      </div>
                      <div className={'trip__location-date'}>
                        {moment(
                          new Date(trip.date_times.return_date_time)
                        ).format('ddd MMM Do')}
                      </div>
                    </div>
                  </div>
                 
                  {trip.attendees &&
                  trip.attendees.length > 0 && (
                    <div className={'trip__card'}>
                      <div className={'trip__location-meta t-right'}>
                        <div className={'trip__location-header'}>
                          surfers in
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

                        {trip.gender !== '' && <>
                          <div className={'trip__location-header paddTop'}>
                            Gender Restriction
                          </div>
                          <div>{trip.gender}</div>
                        </>}

                        {trip.surf_modality !== '' && <>
                          <div className={'trip__location-header paddTop'}>
                            Specific Surf Modality
                          </div>
                          <div>{trip.surf_modality}</div>
                        </>}
                        
                        {trip.surf_level !== '' && <>
                          <div className={'trip__location-header paddTop'}>
                            Specific Surf Level
                          </div>
                          <div>{trip.surf_level}</div>
                        </>}
                        
                        {trip.transport !== '' && <>
                          <div className={'trip__location-header paddTop'}>
                            Transport Mode
                          </div>
                          <div>{trip.transport}</div>
                        </>}
                        
                        {trip.available_seats > 0 && <>
                          <div className={'trip__location-header paddTop'}>
                            Rides Avalible
                          </div>
                          <div>{trip.available_seats}</div>
                        </>}
                        
                        {trip.accomodation !== '' && <>
                          <div className={'trip__location-header paddTop'}>
                            Accomodation
                          </div>
                          <div>{trip.accomodation}</div>
                        </>}

                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </Container>
          </Center>
          <FootItem />
        </ContentContainer>
      </ScrollContainer>
      {console.log('trip count', trip.number_of_surfers , trip.attendees.length, trip.number_of_surfers < trip.attendees.length)}
      {props.user.accessToken && (
        <div className='trip__join'>
        { trip.owner_id === props.user.id ? editButton() : 
          !(trip.number_of_surfers < trip.attendees.length) ?
            joinButton()
         : ((trip.gender === 'only women' && props.user.gender && props.user.gender.toLowerCase() !== "female") 
            || (trip.gender === 'only men' && props.user.gender && props.user.gender.toLowerCase() !== "male")) ? 
            <NoJoin>
              <Button
              outlineDark
              title="Sorry, your profile isn't suitable" disabled/>
            </NoJoin>
            :
          <NoJoin>
            <Button
            outlineDark
            title='Sorry, the trip is at capacity' disabled/>
          </NoJoin>
         }
        </div>
      )
      }
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
