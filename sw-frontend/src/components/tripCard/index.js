import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { General as config, Routes } from 'config'
import { Tools } from 'utils'
import { Avatar } from 'components'
import { TripCard } from './styles'

const TripCardComponent = props => {
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
    const duration = dateDeparture.diff(dateReturn, 'days') + 1
    return duration > 1 ? duration + ' days' : duration + ' day'
  }

  const dateDeparture = moment(new Date(props.date_times.departure_date_time))
  const dateReturn = moment(new Date(props.date_times.return_date_time))

  // console.log('Trip', props)
  return (
    <TripCard style={{ ...props.style }} onClick={onTripPress}>
      <div className={'tripcard__header'}>
        <div className={'tripcard__avatar'}>
          <Avatar
            borderWidth={1}
            image={
              props.owner_details &&
              props.owner_details.avatar &&
              config.EndPoints.digitalOcean + props.owner_details.avatar
            }
          />
        </div>
        <div className={'tripcard__header-meta'}>
          {props.owner_details && (
            <p className={'tripcard__name'}>{`${props.owner_details
              .first_name} ${props.owner_details.last_name}`}</p>
          )}
          <p className={'tripcard__level'}>
            {props.owner_details && props.owner_details.location}
          </p>
        </div>
        <p className={'tripcard__title'}>{props.title}</p>
      </div>
      <div className={'tripcard__location'}>
        <div className={'tripcard__location-meta'}>
          {/* <div className={'tripcard__location-header'}><div className='__icon'>{Tools.renderIcon('van')}</div></div> */}
          <div className={'tripcard__location-place'}>
            {props.departing.name}
          </div>
          <div className={'tripcard__location-date'}>
            {dateDeparture.format('ddd MMM Do')}
          </div>
        </div>
        <div className={'tripcard__divider'}>
          <div className={'tripcard__divider-start'} />
          <div className={'tripcard__divider-rule'} />
          <div className={'tripcard__divider-end'} />
        </div>
        <div className={'tripcard__location-meta t-right'}>
          {/* <div className={'tripcard__location-header'}><div className='__icon'>{Tools.renderIcon('board')}</div></div> */}
          <div className={'tripcard__location-place'}>
            {props.destination.name}
          </div>
          <div className={'tripcard__location-date'}>
            {dateReturn.format('ddd MMM Do')}
          </div>
        </div>
      </div>
      <div className={'tripcard__footer'}>
        <div className={'tripcard__count'}>
          <div className='__icon'>{Tools.renderIcon('calendar')}</div>
          {tripDuration()}
        </div>
        <div className={'tripcard__count'}>
          <div className='__icon'>{Tools.renderIcon('thumb')}</div>
          {props.attendees.length}
        </div>
        {/* <p className={'tripcard__level'}>modality {this.props.surf_modality}</p>
        <div className={'tripcad__deletetrip'}>
          <Link onClick={this.onTripDelete}>DELETE</Link>
        </div> */}
        {/* <div className={'tripcad__viewdetails'}>
          <Link onClick={this.onTripPress}>View details</Link>
        </div> */}
      </div>
    </TripCard>
  )
}

TripCardComponent.propTypes = {
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
  owner_details: PropTypes.object,
  tripDate: PropTypes.object,
  postedDate: PropTypes.object
}

TripCardComponent.defaultProps = {
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
  owner_details: null,
  tripDate: new Date(),
  postedDate: new Date()
}

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions ])
)(withRouter(memo(TripCardComponent)))
