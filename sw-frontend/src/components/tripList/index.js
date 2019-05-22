import React from 'react'
import PropTypes from 'prop-types'
import { useTrail, animated } from 'react-spring'

import { TripCard, Preloader, FootItem } from 'components'
import { Spacings } from 'config'
import { Tools } from 'utils'
import { TripList, ListContainer, PreloadContainer } from './styles'

const TripListComponent = props => {
  const trail = useTrail(props.trips.length, {
    from: { opacity: 0, transform: 'translate3d(0,-20px,0) scale(0.9)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0) scale(1)' }
  })

  return (
    <TripList paddingTop={props.paddingTop}>
      <ListContainer>
        {props.loading && (
          <PreloadContainer>
            <Preloader />
          </PreloadContainer>
        )}
        {!props.loading && trail.length > 0 ? (
          trail.map(({ ...rest }, index) => {
            const trip = props.trips[index]
            return (
              <animated.div
                key={trip._id}
                className='trails-text'
                style={{ ...rest }}>
                <TripCard
                  id={trip._id}
                  owner_id={trip.owner_id}
                  owner_details={trip.owner_details}
                  attendees={trip.attendees}
                  date_times={trip.date_times}
                  departing={trip.departing}
                  destination={trip.destination}
                  title={trip.title}
                  number_of_surfers={trip.number_of_surfers}
                  gender={trip.gender}
                  surf_modality={trip.surf_modality}
                  surf_level={trip.surf_level}
                />
              </animated.div>
            )
          })
        ) : (
          !props.loading && (
            <div className={'triplist__icon'}>
              {Tools.renderIcon('face_sad')}
              <div>
                <strong>WIPEOUT!</strong>
                <br />Sorry no trips available
              </div>
            </div>
          )
        )}
        <FootItem />
      </ListContainer>
    </TripList>
  )
}

TripListComponent.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  paddingTop: PropTypes.number
}

TripListComponent.defaultProps = {
  trips: {},
  loading: false,
  paddingTop: Spacings.MEDIUM
}

export default TripListComponent
