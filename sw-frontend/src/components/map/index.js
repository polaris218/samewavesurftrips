import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userActions,tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { General as config } from 'config'
import { MapIcon } from 'components'
import { apiQuery} from 'api/thunks/general'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import MapContainer from './styles'

const Map = ReactMapboxGl({ accessToken: config.MapboxToken })
const MapComponent = props => {
const [loaded,setLoaded] = useState(false);
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
      if(!loaded) return
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
  const onFilterhResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    // setLoading(false)
    props.onFilter()
  }
  const { current } = props.trips
  return (
    <MapContainer>
      <Map
      // transitionDuration={1000}
      // transitionInterpolator={new FlyToInterpolator()}
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
        // onMoveStart={data => {
        //   console.log("move start:", data);
        // }
        // onStyleLoad={map=>{
        //   console.log(map);
        // }}
        // }
        onStyleLoad={Map=>{
          setLoaded(true);
          // console.log("map is:::::",Map);
          Map.flyTo({
            center: props.autoPosition ? currentLocation: props.position   ,
            zoom: props.autoPosition ? 15 : props.zoom,
            speed: props.autoPosition ? 1.4 : 0
          })
        }}
        // flyToOptions={{
        //   center: props.autoPosition ? currentLocation : props.position,
        //   zoom: props.autoPosition ? 10 : props.zoom,
        //   speed: props.autoPosition ? 1.4 : 0
        // }}
        onMoveEnd={data => {

          console.log('MAP JUST MOVED YO!, ', data)
          console.log("props ar::::",props)
          let searchParams = ''
          if (props.trips.search.dateDeparture!='') {
            searchParams += `&departure_date_time=${props.trips.search.dateDeparture}`;
          }
          if (props.trips.search.dateReturn!='') {
            searchParams += `&return_date_time=${props.trips.search.dateReturn}`;
          }
          // if (props.trips.search.lat!='')
          //   searchParams += `&lng=${props.trips.search.lng}&lat=${props.trips.search.lat}`
          if (props.trips.search.gender!='') searchParams += `&gender=${props.trips.search.gender}`
          if (props.trips.search.modality!='')
            searchParams += `&surf_modality=${props.trips.search.modality}`
          if (props.trips.search.Level!='') searchParams += `&surf_level=${props.trips.search.Level}`
      
          searchParams = `?${searchParams}`
          // setLoading(true)
          // debugger
          // dispatch(props.searchDetails({ ...params })) 
          // debugger   
          dispatch(
            apiQuery(null, props.filterTrips, config.EndPoints.search + searchParams, onFilterhResult,'get',searchParams)
          )
          // debugger
        }}
      >
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
                    active={props.trips.current._id === trip._id} />
                </Marker>}
              </div>
            ))
          )}
      </Map>
    </MapContainer>
  )
}

MapComponent.propTypes = {
  autoPosition: PropTypes.bool,
  banner: PropTypes.bool,
  position: PropTypes.array,
  zoom: PropTypes.number,
  onFilter: PropTypes.func
}

MapComponent.defaultProps = {
  banner: false,
  position: [134.489563, -25.734968],
  zoom: 7,
  autoPosition: true,
  onFilter: () => {}
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [userActions,tripActions])
)(MapComponent)
