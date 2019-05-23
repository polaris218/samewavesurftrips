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
  FootItem
} from 'components'
import { Tools } from 'utils'
import { Trip, ContentContainer, Center } from './styles'

const TripScreen = props => {
  const [ state, setState ] = useState({
    trip: {},
    loading: false,
    joined: false
  })

  useEffect(() => {
    // TODO: If not Current Trip prop, get via ID in URL
    setState({
      ...state,
      joined: checkTripStatus()
    })
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
          <Button onPress={onJoinPress} title='JOIN THIS SURF TRIP' />
        ) : (
          <Button
            onPress={onJoinPress.bind(this, false)}
            title='LEAVE THE TRIP'
            color={Colors.RED_BASE}
            hoverColor={Colors.RED_DARK}
          />
        )}
      </div>
    )

  const trip = props.trips.current

  return (
    <Trip>
      <ScrollContainer height='auto'>
        <Header
          backButton
          homeButton={false}
          nav={false}
          // title={trip.title}
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
                <Avatar
                  image={
                    trip.owner_details &&
                    config.EndPoints.digitalOcean + trip.owner_details.avatar
                  }
                />
              </div>
              <div className={'trip__header-meta'}>
                <div className='trip__person' onClick={visitProfile}>
                  <p className={'trip__name'}>
                    {trip.owner_details &&
                      `${trip.owner_details.first_name} ${trip.owner_details
                        .last_name}`}
                  </p>
                  <div className={'trip__location'}>
                    {Tools.renderIcon('pin')}{' '}
                    {trip.owner_details.location ? !trip.owner_details.location
                      .coordinates ? (
                      trip.owner_details.location
                    ) : (
                      trip.owner_details.location.coordinates.name
                    ) : (
                      ``
                    )}
                  </div>
                </div>
                <div className='trip__join-desktop'>{joinButton()}</div>
              </div>
              <div className='trip__join-mobile'>{joinButton()}</div>
              <div className={'trip__card'}>
                <Card>
                  <div className={'trip__title'}>
                    {trip.title}
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
                    <div className={'trip__description'}>
                      <div className={'trip__location-header'}>
                        trip details:
                      </div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In sed ornare felis, vel tristique ligula. Mauris sit amet
                      sapien sed mi tristique tincidunt. Nam varius justo mi,
                      sed viverra ante pretium elementum. Vestibulum odio velit,
                      commodo eget euismod et, semper eget est. Donec cursus
                      varius sem. Aenean a felis ac dui lacinia congue.
                      Suspendisse porttitor non ligula quis fermentum
                    </div>
                  </Card>
                </div>
                <div className={'trip__card'}>
                  <Card>
                    <div className={'trip__level'}>
                      <div className={'trip__icon'}>
                        {Tools.renderIcon('wave')}
                      </div>
                      <div>
                        <div className={'trip__location-header'}>
                          surf level:
                        </div>
                        <div className='trip__level-value'>
                          {trip.surf_level}
                        </div>
                      </div>
                    </div>
                    <div className={'trip__level'}>
                      <div className={'trip__icon'}>
                        {Tools.renderIcon('surferMale')}
                      </div>
                      <div>
                        <div className={'trip__location-header'}>
                          surfers going:
                        </div>
                        <div className='trip__level-value'>
                          {' '}
                          {trip.attendees.length}
                        </div>
                      </div>
                    </div>
                    <div className={'trip__level'}>
                      <div className={'trip__icon'}>
                        {Tools.renderIcon('board')}
                      </div>
                      <div>
                        <div className={'trip__location-header'}>
                          recommended board:
                        </div>
                        <div className='trip__level-value'>
                          {trip.surf_modality}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Container>
          </Center>
          <FootItem />
        </ContentContainer>
      </ScrollContainer>
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
