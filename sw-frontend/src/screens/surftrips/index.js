import React, { useState, useEffect } from 'react'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'

import {
  Container,
  Fab,
  Footer,
  Header,
  Tabs,
  TripList,
  ScrollContainer
} from 'components'
import { Trips, ContentContainer, FootContainer } from './styles'

const SurfTripsScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState(0)
  const [ tabs ] = useState([ 'Active trips', 'Past trips', 'All trips' ])
  let mounted = true

  /*
  * Component Will Unmount HOOK
  */

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    onTabPress(0)
    fetchTrips()
  }, [])

  const fetchTrips = () => {
    setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${props.user.id}`,
        onFetchResult,
        'get'
      )
    )
  }

  const onFetchResult = error => {
    if (error.status !== 200) {
      console.log('fetch trip error', error)
    } else {
      mounted && setLoading(false)
    }
  }

  const onTabPress = value => {
    mounted && setActiveTab(value)
  }

  const filterTrips = (trips, value) => {
    const active = []
    const old = []
    trips.forEach(trip => {
      if (new Date(trip.date_times.return_date_time) >= new Date()) {
        active.push(trip)
      } else {
        old.push(trip)
      }
    })

    switch (value) {
      case 0:
        return active
      case 1:
        return old
      default:
        return props.trips.yourTrips
    }
  }

  return (
    <Trips>
      <Header title={'Surf Trips'} />
      <Tabs tabs={tabs} onTabPress={onTabPress} />
      <ScrollContainer padTop={false}>
        <ContentContainer>
          <Container>
            <TripList
              trips={filterTrips(props.trips.yourTrips, activeTab)}
              loading={loading}
            />
          </Container>
        </ContentContainer>
      </ScrollContainer>
      <Fab />
      <FootContainer>
        <Footer />
      </FootContainer>
    </Trips>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(SurfTripsScreen))
