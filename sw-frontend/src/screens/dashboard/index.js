import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useSpring, animated } from 'react-spring'

import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { withRouter } from 'react-router-dom'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { Tools } from 'utils'
// import { Routes } from 'config';
import {
  Fab,
  Map,
  Toggle,
  TripList,
  Header,
  MapCard,
  ScrollContainer,
  Search,
  Footer
} from 'components'
import { Dashboard, MapTripDetail } from './styles'

const DashboardScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ searchVisible, setSearchVisible ] = useState(true)
  const [ activeTab, setActiveTab ] = useState('list')
  const [ initalDisplay, setInitialDisplay ] = useState(false)

  useEffect(() => {
    fetchTrips()
  }, [])

  useEffect(
    () => {
      onMapCardPress()
    },
    [ props.trips.current._id ]
  )

  const fetchTrips = () => {
    setLoading(true)
    setInitialDisplay(true)
    const searchParams = props.trips.filter

    dispatch(
      apiQuery(
        null,
        props.fetchAllTrips,
        config.EndPoints.search + searchParams,
        onFetchResult,
        'get',
        searchParams
      )
    )
  }

  const onFetchResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    setLoading(false)
  }

  const onTogglePress = activeName => {
    setActiveTab(activeName)
    if (activeName === 'map') {
      setInitialDisplay(true)
    }
  }

  const onSearchPress = () => {
    setSearchVisible(!searchVisible)
  }

  const onFilterPress = () => {
    onSearchPress()
  }

  const onMapCardPress = () => {
    setInitialDisplay(false)
  }

  const { current } = props.trips
  const startSpring = {
    opacity: 0,
    transform: 'translate3d(0,200px,0) scale(0.9)'
  }
  const springProps = useSpring({
    from: startSpring,
    to: initalDisplay
      ? startSpring
      : { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' },
    reset: true
  })

  return (
    <Dashboard>
      <ScrollContainer height={'55'}>
        <Header
          title='Search Trips'
          rightIcon={Tools.renderIcon(searchVisible ? 'search' : 'close')}
          rightAction={onSearchPress}
        />
        {activeTab === 'map' ? (
          <Map trips={props.trips.allTrips} />
        ) : (
          <TripList
            trips={props.trips.allTrips}
            loading={loading}
            paddingTop={140}
            paddingSide
          />
        )}
        <div className={'dashboard__switch'}>
          <Toggle
            onPress={onTogglePress}
            items={[ 'map', 'list' ]}
            active={activeTab}
          />
        </div>
        <Fab />
        {activeTab === 'map' && (
          <MapTripDetail>
            <animated.div style={springProps}>
              <MapCard
                id={current._id}
                owner_id={current.owner_id}
                owner_details={current.owner_details}
                attendees={current.attendees}
                date_times={current.date_times}
                departing={current.departing}
                destination={current.destination}
                title={current.title}
                number_of_surfers={current.number_of_surfers}
                gender={current.gender}
                surf_modality={current.surf_modality}
                surf_level={current.surf_level}
              />
            </animated.div>
          </MapTripDetail>
        )}
        <Search visible={searchVisible} onFilter={onFilterPress} />
      </ScrollContainer>
      {activeTab === 'list' && <Footer />}
    </Dashboard>
  )
}

DashboardScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

DashboardScreen.defaultProps = {
  history: {},
  location: ''
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(DashboardScreen))
