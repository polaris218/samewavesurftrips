import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { General as config } from 'config'
import { MapIcon } from 'components'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import MapContainer from './styles'

const Map = ReactMapboxGl({ accessToken: config.MapboxToken })

const MapComponent = props => {
  const [currentLocation, setCurrectLocation] = useState(props.position);
  let mounted = true;
  useEffect(() => { return () => { mounted = false } }, []);

  useEffect(() => { console.log("Run loc map="); onLocation() }, []);
  useEffect(() => {
    console.log("Run loc map=");

    if (JSON.parse(localStorage.getItem('search_loc'))) {
      console.log("Run loc map if=");
      setCurrectLocation([
        JSON.parse(localStorage.getItem('search_loc')).lng,
        JSON.parse(localStorage.getItem('search_loc')).lat
      ])
    }

  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("Current Location Run=");
      navigator.geolocation.getCurrentPosition(onLocation)
    } else {
      console.warn('Geolocation is not supported by this browser.')
    }
  }

  const onLocation = position => {
    console.log("map onLocation=", position);
    mounted &&
      setCurrectLocation([
        JSON.parse(localStorage.getItem('search_loc')).lng,
        JSON.parse(localStorage.getItem('search_loc')).lat
      ])
  }

  const onTripPress = trip => {
    console.log("map onTripPress=", trip);
    console.log("map props.trips=", props.trips);

    dispatch(props.setCurrentTrip({ ...trip }))
  }
  // const events = {

  // }
  // Map.onMoveStart = () => {
  //   console.log("move start")
  // }
    // Map.on("touchstart",'point',{start})

    // const start = () => {
    //   console.log("touch start")
    // }
  const { current } = props.trips
  return (
    <MapContainer>
      <Map
        // eslint-disable-next-line={'react/style-prop-object'}
        style={'mapbox://styles/deprogram/cjno44eaf0xb42rpdmw1y2co6'}
        bearing={props.banner && [230]}
        pitch={props.banner && [85]}
        center={currentLocation}
        // zoom={[props.zoom]}
        containerStyle={{
          height: props.banner ? '100%' : '100vh',
          width: '100vw'
        }}
        onDragStart={
          console.log("onDragStart")
        }
        onMouseDown={
          console.log("onmousedown")
        }
        onMoveStart={
          console.log("onMoveStart")
        }
        flyToOptions={{
          center: props.autoPosition ? currentLocation : props.position,
          zoom: props.autoPosition ? 10 : props.zoom,
          speed: props.autoPosition ? 2.4 : 0
        }}>
        {getCurrentLocation()}
        {props.banner ? (
          <div key={current._id}>
            <Marker coordinates={[current.departing.lng, current.departing.lat]} anchor='bottom'>
              <MapIcon size='large' trip={current} type={'departing'} onTripPress={onTripPress} />
            </Marker>
            <Marker coordinates={[current.destination.lng, current.destination.lat]} anchor='bottom'>
              <MapIcon size='large' trip={current} type={'destination'} onTripPress={onTripPress} />
            </Marker>
          </div>
        ) : (
            props.trips.allTrips.map(trip => (

              <div key={trip._id}>
                <Marker coordinates={[trip.departing.lng, trip.departing.lat]} anchor='bottom'>
                  <MapIcon trip={trip} type={'departing'} onTripPress={onTripPress}
                    active={props.trips.current._id === trip._id} />
                </Marker>
                {<Marker coordinates={[trip.destination.lng, trip.destination.lat]} anchor='bottom'>
                  <MapIcon trip={trip} type={'destination'} onTripPress={onTripPress}
                    active={props.trips.current._id === trip._id}   />
                </Marker>}
              </div>
            ))
          )}
      </Map>
    </MapContainer>
  )
}

MapComponent.ropTypes = {
  autoPosition: PropTypes.bool,
  banner: PropTypes.bool,
  position: PropTypes.array,
  zoom: PropTypes.number
}

MapComponent.defaultProps = {
  banner: false,
  position: [134.489563, -25.734968],
  zoom: 7,
  autoPosition: true
}

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [tripActions])
)(MapComponent)
