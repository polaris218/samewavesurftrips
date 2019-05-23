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
  const [ loading, setLoading ] = useState(false)
  // const [activeTab, setActiveTab] = useState('active');
  const [ tabs ] = useState([ 'Active', 'Past', 'All' ])
  const [ trips, setTrips ] = useState([])

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
    if (error) {
      console.log('what error', error)
    }
    setLoading(false)
  }

  const onTabPress = value => {
    const active = []
    const old = []
    props.trips.yourTrips.forEach(trip => {
      if (new Date(trip.date_times.return_date_time) >= new Date()) {
        active.push(trip)
      } else {
        old.push(trip)
      }
    })

    switch (value) {
      case 0:
        setTrips(active)
        break
      case 1:
        setTrips(old)
        break
      default:
        setTrips(props.trips.yourTrips)
        break
    }
  }

  return (
    <Trips>
      <Header title={'Your Trips'} />
      <Tabs tabs={tabs} onTabPress={onTabPress} />
      <ScrollContainer padTop={false}>
        <ContentContainer>
          <Container>
            <TripList trips={trips} loading={loading} />
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
