import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes } from 'config'
import { Tools } from 'utils'
import { Avatar } from 'components'
import { UserCard } from './styles'

const UserCardComponent = props => {
  const [ loading, setLoading ] = useState(true)
  const [ owner, setOwnerDetails ] = useState({ avatar: '' })
  let mounted = true

  useEffect(() => {
    // Get latest Trip Owner details (avatar etc can change)
    fetchOwnerDetails()
  }, [])

  const onUserPress = props => {
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

  return (
    <UserCard style={{ ...props.style }} onClick={onUserPress}>
      <div className={'tripcard__header'}>
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
            {owner && owner.surf_level ? owner.surf_level : ''}
          </p>
        </div>
      </div>
    </UserCard>
  )
}

UserCardComponent.propTypes = {
  history: PropTypes.object,
  id: PropTypes.string,
  owner_details: PropTypes.object
}

UserCardComponent.defaultProps = {
  id: null,
  owner_id: null,
  owner_details: null
}

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(memo(UserCardComponent)))
