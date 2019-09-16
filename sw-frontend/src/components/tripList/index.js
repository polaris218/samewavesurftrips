import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTrail, animated } from 'react-spring'

import { TripCard, Preloader, FootItem } from 'components'
import { Spacings } from 'config'
import { Tools } from 'utils'
import { TripList, ListContainer, PreloadContainer } from './styles'

const Trip = ({ trip, ownerDetailVisible }) => {
  const [trail] = useTrail(1, {
    from: { opacity: 0, transform: 'translate3d(0,30px,0) scale(1)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0) scale(1)' }
  })

  return <animated.div
    key={trip._id}
    className='trails-text'
    style={trail}
  >
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
      accomodation={trip.accomodation}
      available_seats={trip.available_seats}
      offering_rides={trip.offering_rides}
      transport={trip.transport}
      trip_details={trip.trip_details}
      ownerDetailVisible={ownerDetailVisible}
    />
  </animated.div>
}

const TripListComponent = props => {
  const trackScrolling = () => {
    const wrappedElement = document.getElementById('scroller');
    if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
      props.loadMoreTrips()
    }
  }

  useEffect(() => {
    document.getElementById("scroller").addEventListener('scroll', trackScrolling);
  }, [])

  // Reverse the Trips list so Newset on top
  const trips = props.trips

  return (
    <TripList id="scroller" paddingTop={props.paddingTop} paddingSide={props.paddingSide}>
      <ListContainer>
        {props.loading && (
          <PreloadContainer>
            <Preloader />
          </PreloadContainer>
        )}

        {!props.loading && trips.length > 0 ? (
          trips.map((trip, index) => {
            return (
              <Trip key={index} trip={trip} ownerDetailVisible={props.ownerDetailVisible} />
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
  loadingMore: PropTypes.bool,
  paddingTop: PropTypes.number,
  paginationParams: PropTypes.object,
  paddingSide: PropTypes.bool,
  ownerDetailVisible: PropTypes.bool,
  loadMoreTrips: PropTypes.func
}

TripListComponent.defaultProps = {
  trips: {},
  loading: false,
  loadingMore: false,
  paginationParams: { limit: 10, page: 0 },
  paddingTop: Spacings.MEDIUM,
  paddingSide: false,
  ownerDetailVisible: true,
  loadMoreTrips: () => {},
}

export default TripListComponent
