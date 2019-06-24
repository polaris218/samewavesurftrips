import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { Routes } from 'config'
import { Tools } from 'utils'

import { MapCard } from './styles'

const MapCardComponent = props => {
  const onTripPress = () => {
    const {
      id,
      owner_id,
      owner_details,
      attendees,
      title,
      date_times,
      departing,
      destination,
      number_of_surfers,
      gender,
      surf_modality,
      surf_level,
      name,
      avatar,
      tripDate,
      postedDate,
      accomodation,
      available_seats,
      offering_rides,
      transport,
      trip_details
    } = props

    dispatch(
      props.setCurrentTrip({
        id,
        owner_id,
        owner_details,
        attendees,
        title,
        date_times,
        departing,
        destination,
        number_of_surfers,
        gender,
        surf_modality,
        surf_level,
        name,
        avatar,
        tripDate,
        postedDate,
        accomodation,
        available_seats,
        offering_rides,
        transport,
        trip_details
      })
    )
    // Load Trip details
    props.history.push(`/${Routes.TRIP}/${props.id}`)
  }

  const tripDuration = () => {
    const duration = dateReturn.diff(dateDeparture, 'days') + 1
    return duration > 1 ? duration + ' days' : duration + ' day'
  }

  const dateDeparture = moment(new Date(props.date_times.departure_date_time))
  const dateReturn = moment(new Date(props.date_times.return_date_time))

  return (
    <MapCard style={{ ...props.style }} onClick={onTripPress}>
      <div className={'mapcard__header'}>
        <div className={'mapcard__title'}>{props.title}</div>
      </div>
      <div className={'mapcard__location'}>
        <div className={'mapcard__location-meta'}>
          <div className={'mapcard__location-header'}>
            <div className='__icon'>{Tools.renderIcon('van')}</div>
          </div>
          <div className={'mapcard__location-place'}>
            {props.departing.name}
          </div>
        </div>
        <div className={'mapcard__location-meta t-right'}>
          <div className={'mapcard__location-header'}>
            <div className='__icon'>{Tools.renderIcon('board')}</div>
          </div>
          <div className={'mapcard__location-place'}>
            {props.destination.name}
          </div>
        </div>
      </div>
      <div className={'mapcard__footer'}>
        <div className={'mapcard__count'}>
          <div className='__icon'>{Tools.renderIcon('calendar')}</div>
          {tripDuration()}
        </div>
        <div className={'mapcard__count'}>
          <div className='__icon'>{Tools.renderIcon('thumb')}</div>
          {props.attendees.length}
        </div>
        <div className={'tripcad__viewdetails'}>
          <div className={'mapcard__location-date'}>
            {dateDeparture.format('MMM Do')}
          </div>
        </div>
      </div>
    </MapCard>
  )
}

MapCardComponent.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  id: PropTypes.string,
  owner_id: PropTypes.string,
  attendees: PropTypes.array,
  date_times: PropTypes.object,
  departing: PropTypes.object,
  destination: PropTypes.object,
  number_of_surfers: PropTypes.number,
  gender: PropTypes.string,
  surf_modality: PropTypes.string,
  surf_level: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  tripDate: PropTypes.object,
  postedDate: PropTypes.object,
  onTransition: PropTypes.func
}

MapCardComponent.defaultProps = {
  id: null,
  owner_id: null,
  attendees: [],
  title: '',
  date_times: {},
  departing: {},
  destination: {},
  number_of_surfers: 0,
  gender: '',
  surf_modality: '',
  surf_level: '',
  name: '',
  avatar: null,
  tripDate: new Date(),
  postedDate: new Date(),
  onTransition: () => {}
}

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions ])
)(withRouter(MapCardComponent))
