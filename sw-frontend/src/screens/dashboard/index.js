import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { withRouter } from 'react-router-dom'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { Tools } from 'utils'
import {
  Fab,
  Map,
  Toggle,
  TripList,
  Header,
  MapCard,
  ScrollContainer,
  Search,
  Footer,
  Filters,
  Preloader
} from 'components'
import { Dashboard, MapTripDetail } from './styles'

const DashboardScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ loadingMore, setLoadingMore ] = useState(false)

  const [ searchVisible, setSearchVisible ] = useState(true)
  const [ filterVisible, setFilterVisible ] = useState(false)
  const [ activeTab, setActiveTab ] = useState('list')
  const [ initalDisplay, setInitialDisplay ] = useState(false)
  const [ paginationParams, setPaginationParams ] = useState({
    limit: 10,
    page: 0
  })

  let mounted = true

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(
    () => {
      fetchTrips(paginationParams)
    },
    [ paginationParams ]
  )

  useEffect(
    () => {
      onMapCardPress()
    },
    [ props.trips.current.id ]
  )

  const loadMore = () => {
    if (!loadingMore) {
      setPaginationParams({
        limit: paginationParams.limit,
        page: paginationParams.page + 1
      })
    }
  }

  const fetchTrips = ({ limit = 4, page = 0 } = {}) => {
    const isFirstQuery = page === 0

    if (!isFirstQuery) {
      mounted && setLoadingMore(true)
    } else {
      mounted && setLoading(true)
      mounted && setInitialDisplay(true)
    }

    const searchParams = props.trips.filter + `limit=${limit}&page=${page}`
    dispatch(
      apiQuery(
        null,
        isFirstQuery ? props.fetchAllTrips : props.fetchMoreTrips,
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
    setLoadingMore(false)
  }

  const onTogglePress = activeName => {
    mounted && setActiveTab(activeName)
    if (activeName === 'map') {
      mounted && setInitialDisplay(true)
    }
    // Record Activity in GA
    ReactGA.event({
      category: 'Trip',
      action: `Searching trip ${activeName === 'map' ? 'Map' : 'List'} view`
    })
  }

  const onSearchPress = () => {
    if (!searchVisible) {
      onMapCardPress()
    }
    console.log('searchVisible=', searchVisible)
    mounted && setSearchVisible(!searchVisible)
  }

  const onFilterPress = () => {
    setFilterVisible(!filterVisible)
  }

  const onFilterApply = () => {
    setFilterVisible(false)
    onSearchPress()
    // Record Activity in GA
    ReactGA.event({
      category: 'Trip',
      action: `Trip search filtered`
    })
  }

  // const onFilterhResult = error => {
  //   if (error.status !== 200) {
  //     console.log('what error', error)
  //   }
  //   // setLoading(false)
  //   props.onFilter()
  // }

  // const onReasearchPress = () => {
  //   let searchParams = ''
  //   if (props.trips.search.dateDeparture !== '') {
  //     searchParams += `&departure_date_time=${props.trips.search.dateDeparture}`
  //   }
  //   if (props.trips.search.dateReturn !== '') {
  //     searchParams += `&return_date_time=${props.trips.search.dateReturn}`
  //   }
  //   if (props.trips.search.lat !== '')
  //     searchParams += `&lng=${props.trips.search.lng}&lat=${props.trips.search
  //       .lat}`
  //   if (props.trips.search.gender !== '')
  //     searchParams += `&gender=${props.trips.search.gender}`
  //   if (props.trips.search.modality !== '')
  //     searchParams += `&surf_modality=${props.trips.search.modality}`
  //   if (props.trips.search.Level !== '')
  //     searchParams += `&surf_level=${props.trips.search.Level}`

  //   searchParams = `?${searchParams}`
  //   dispatch(
  //     apiQuery(
  //       null,
  //       props.filterTrips,
  //       config.EndPoints.search + searchParams,
  //       onFilterhResult,
  //       'get',
  //       searchParams
  //     )
  //   )
  // }

  const onMapCardPress = () => {
    mounted && setInitialDisplay(false)
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
      <ScrollContainer height={'35'}>
        {!filterVisible ? (
          <Header
            title={!filterVisible ? 'Search Surf Trip' : 'Filters'}
            rightIcon={Tools.renderIcon(searchVisible ? 'search' : 'close')}
            rightAction={onSearchPress}
          />
        ) : (
          <Filters onClose={onFilterPress} />
        )}

        {activeTab === 'map' ? (
          <Map trips={props.trips.allTrips} />
        ) : (
          [
            <TripList
              key={1}
              trips={props.trips.allTrips}
              loading={loading}
              loadingMore={loadingMore}
              paginationParams={paginationParams}
              paddingTop={!searchVisible ? 300 : 140}
              paddingSide
              loadMoreTrips={() => {
                document.getElementById('btn-load-more').click()
              }}
            />,
            <div
              key={2}
              style={{
                position: 'absolute',
                top: '90%',
                width: '100vw',
                textAlign: 'center'
              }}>
              {loadingMore && <Preloader />}
            </div>
          ]
        )}
        {searchVisible &&
        !filterVisible && (
          <div className={'dashboard__switch'}>
            <Toggle
              onPress={onTogglePress}
              items={[ 'map', 'list' ]}
              active={activeTab}
            />
          </div>
        )}

        <Fab />

        {activeTab === 'map' && (
          <MapTripDetail>
            {/* <ButtonContainer>
             <Button primary title={'FILTER'} onPress={onFilterPress}/>
            </ButtonContainer> */}
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
        {!searchVisible && (
          <Search
            visible={searchVisible}
            onFilter={onFilterPress}
            onSearch={onFilterApply}
          />
        )}

        <button id='btn-load-more' style={{ opacity: 0 }} onClick={loadMore}>
          Load
        </button>
      </ScrollContainer>
      {activeTab === 'list' && <Footer />}
    </Dashboard>
  )
}

DashboardScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  onFilter: PropTypes.func
}

DashboardScreen.defaultProps = {
  history: {},
  location: '',
  onFilter: () => {}
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips,
  items: [],
  isLoading: true,
  cursor: 0
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(DashboardScreen))
