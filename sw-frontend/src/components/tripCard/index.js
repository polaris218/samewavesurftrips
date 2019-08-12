import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes } from 'config'
import { Tools } from 'utils'
import { Avatar } from 'components'
import { TripCard } from './styles'

const TripCardComponent = props => {
  const [ loading, setLoading ] = useState(true)
  const [ owner, setOwnerDetails ] = useState({ avatar: '' })
  let mounted = true

  useEffect(() => {
    // Get latest Trip Owner details (avatar etc can change)
    fetchOwnerDetails()
  }, [])

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

  /*
   * Component Will Unmount HOOK
   */

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  const tripDuration = () => {
    const duration = dateReturn.diff(dateDeparture, 'days') + 1
    return duration > 1 ? duration + ' days' : duration + ' day'
  }

  const fetchOwnerDetails = () => {
    mounted && setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.usersListDetails,
        config.EndPoints.user + `/${props.owner_id}`,
        onOwnerResult,
        'GET'
      )
    )
  }

  const onOwnerResult = res => {
    mounted && setLoading(false)
    if (res.status !== 200) {
      console.log('fetch error', res)
    } else {
      mounted && setOwnerDetails(res.data)
    }
  }

  const userAvatar = () => {
    let image = ''
    if (owner.avatar) {
      if (owner.avatar.includes('https://')) return owner.avatar
      image = config.EndPoints.digitalOcean + owner.avatar
    }

    return image
  }

  const dateDeparture = moment(new Date(props.date_times.departure_date_time))
  const dateReturn = moment(new Date(props.date_times.return_date_time))

  return (
    <TripCard style={{ ...props.style }} onClick={onTripPress} ownerDetailVisible={props.ownerDetailVisible}>
      <div className={'tripcard__header'}>
        {props.ownerDetailVisible && 
        <>
        <div className={'tripcard__avatar'}>
          <Avatar borderWidth={1} image={!loading ? userAvatar() : ''} />
        </div>
        <div className={'tripcard__header-meta'}>
          {owner && (
            <p className={'tripcard__name'}>
              {`${owner.first_name ? owner.first_name : ''} ${owner.last_name
                ? owner.last_name
                : ''}`}
            </p>
          )}
          <p className={'tripcard__level'}>
            {owner && owner.surf_level ? owner.surf_level  : '' }
          </p>
        </div>
        </>}
        {/* <p className={'tripcard__title'}>{props.title}</p> */}
      </div>
      <div className={'tripcard__location'}>
        <div className={'tripcard__location-meta'}>
          {/* <div className={'tripcard__location-header'}><div className='__icon'>{Tools.renderIcon('van')}</div></div> */}
          <div className={'tripcard__location-place'}>
            {Tools.cutName(props.departing.name)}
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
            {Tools.cutName(props.destination.name)}
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
          <div className='__icon'>{Tools.renderIcon('groovy')}</div>
          {props.attendees.length} Surfers in
        </div>
        <div className={'tripcard__more'}>
          <div className='__icon'>{Tools.renderIcon('chevron')}</div>
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
  postedDate: PropTypes.object,
  ownerDetailVisible: PropTypes.bool
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
  postedDate: new Date(),
  ownerDetailVisible: true
}

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions, userActions ])
)(withRouter(memo(TripCardComponent)))
