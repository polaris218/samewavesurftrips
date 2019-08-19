import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { Spring } from 'react-spring/renderprops'

import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Colors, Types } from 'config'
import { Tools } from 'utils'
import {
  ScrollContainer,
  Button,
  ButtonGroup,
  Container,
  Input,
  Places,
  Card,
  Heading,
  Header,
  Preloader,
  Modal
} from 'components'
import {
  Label,
  Trip,
  DateInput,
  ContentContainer,
  ButtonFooter,
  ButtonGroupRow
} from './styles'

const EditTripScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ editSuccess, setEditSuccess ] = useState(false)
  const [ state, setState ] = useState({
    title: props.trips.current.title,
    departing: props.trips.current.departing,
    destination: props.trips.current.destination,
    date_departure: new Date(
      props.trips.current.date_times.departure_date_time
    ),
    date_return: new Date(props.trips.current.date_times.return_date_time),
    surferCount: props.trips.current.number_of_surfers,
    gender: props.trips.current.gender,
    modality: props.trips.current.surf_modality,
    level: props.trips.current.surf_level,
    invalid: []
  })
  const [genders, setGenders] = useState([])
  const [genderSelected, setGenderSelected] = useState(0)
  const [modality, setModality] = useState([])
  const [modalitySelected, setModalitySelected] = useState(0)
  const [accomodation, setAccomodation] = useState([])
  const [accomodationSelected, setAccomodationSelected] = useState(0)
  const [transport, setTransport] = useState([])
  const [transportSelected, setTransportSelected] = useState(0)
  const [surfLevel, setSurfLevel] = useState([])
  const [surfLevelSelected, setSurfLevelSelected] = useState(0)

  useEffect(() => {
    // Set the Types
    // Gender
    // const GTypes = ['Anyone', 'Only Women', 'Only Men']
    const tempGenders = []
    Types.tripGenders.forEach((gender, i) => {
      tempGenders.push({
        title: gender,
      })
      if(props.trips.current.gender === gender.toLowerCase()) setGenderSelected(i)
    })
    setGenders(tempGenders)
    //Modailty
    const tempMods = []
    Types.modality.forEach((mod, i) => {
      tempMods.push({
        title: mod,
      })
      if(props.trips.current.surf_modality === mod.toLowerCase()) setModalitySelected(i)
    })
    setModality(tempMods)
    //Accomodation
    const tempAccom = []
    Types.accomodation.forEach((accom, i) => {
      tempAccom.push({
        title: accom,
      })
      if(props.trips.current.accomodation === accom.toLowerCase()) setAccomodationSelected(i)
    })
    setAccomodation(tempAccom)
    //Transport
    const tempTrans = []
    Types.transport.forEach((trans, i) => {
      tempTrans.push({
        title: trans,
      })
      if(props.trips.current.transport === trans.toLowerCase()) setTransportSelected(i)
    })
    setTransport(tempTrans)
    //SurfLevel
    const levelMods = []
    Types.surfLevel.forEach((level, i) => {
      levelMods.push({
        title: level,
      })
      if(props.trips.current.surf_level === level.toLowerCase()) setSurfLevelSelected(i)
    })
    setSurfLevel(levelMods)
  }, [])

  const onGenderPress = (index) => {
    setGenderSelected(index)
    setState({
      ...state,
      gender: genders[index] && genders[index].title
    })
  }

  const onModalityPress = (index) => {
    setModalitySelected(index)
    setState({
      ...state,
      modality: modality[index] && modality[index].title
    })
  }

  const onAccommodationPress = (index) => {
    setAccomodationSelected(index)
    setState({
      ...state,
      accomodation: accomodation[index] && accomodation[index].title
    })
  }

  const onSurfLevelPress = (index) => {
    setSurfLevelSelected(index)
    setState({
      ...state,
      surf_level: surfLevel[index].title
    })
  }

  const onTransportPress = (index) => {
    setTransportSelected(index)
    setState({
      ...state,
      transport: transport[index] && transport[index].title
    })
  }

  const onDeletePress = () => {
    const data = {
      params: { id: props.trips.current.id },
      user: { _id: props.user.id }
    }
    setLoading(false)
    dispatch(
      apiQuery(
        data,
        props.deleteTrip,
        config.EndPoints.trip + `/${props.trips.current.id}`,
        onTripResult,
        'delete'
      )
    )
    setModalVisible(false)
  }

  const onEditPress = () => {
    setLoading(true)
    const data = {
      ...props.trips.current,
      authtoken: props.user.accessToken,
      departing:
        props.trips.current.departing !== state.departing
          ? state.departing
          : JSON.stringify(state.departing),
      departure_date_time: state.date_departure,
      destination:
        props.trips.current.destination !== state.destination
          ? state.destination
          : JSON.stringify(state.destination),
      gender: state.gender,
      number_of_surfers: state.surferCount,
      return_date_time: state.date_return,
      surf_level: state.surf_level,
      surf_modality: state.surf_modality,
      transport: state.transport,
      accomodation: state.accomodation,
      title: state.title
    }

    //Validate from .....
    const valid = validateForm(data)
    if (valid) {
      // Send
      dispatch(
        apiQuery(
          data,
          props.createTrip,
          config.EndPoints.trip + `/${props.trips.current.id}`,
          onTripResult,
          'put'
        )
      )
    }
  }

  const onTripResult = error => {
    if (error.status !== 200) {
      setLoading(false)
      setState({
        ...state,
        error
      })
    } else {
      setLoading(false)
      setEditSuccess(true)
    }
  }

  const validateForm = data => {
    const errors = []
    // if (data.title === '') errors.push('title')
    if (data.departing === '') errors.push('departing')
    if (data.destination === '') errors.push('destination')
    if (data.surferCount === '') errors.push('surferCount')
    if (data.gender === '') errors.push('gender')
    if (data.modality === '') errors.push('modality')
    if (data.level === '') errors.push('level')

    if (errors.length > 0) {
      setLoading(false)
      setState({
        ...state,
        invalid: errors
      })
      return false
    } else {
      return true
    }
  }

  const checkValidField = name => {
    return state.invalid.indexOf(name) > -1
  }

  const onInputChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onSetLocation = (location, field) => {
    setState({
      ...state,
      [field]: JSON.stringify(location)
    })
  }

  const onCompleteButton = () => {
    props.history.push('/' + Routes.SURFTRIPS)
  }

  const handleDateChange = (date, field) => {
    setState({
      ...state,
      [field]: date
    })
  }

  return (
    <Trip>
      <ScrollContainer navbar={false} align={'center'}>
        <Header
          nav={false}
          backButton
          homeButton={false}
          title='Edit your Trip'
        />
        <ContentContainer>
          {!editSuccess ? (
            <Container>
              <div className='trip__container'>
                <Card slim>
                  {/* <Label>Title</Label>
                  <Input
                    label='Trip Title'
                    onChange={onInputChange}
                    value={state.title}
                    fieldName={'title'}
                    error={checkValidField('title')}
                  /> */}

                  <Label>Departing</Label>
                  <Places
                    label='Departing'
                    onChange={location => onSetLocation(location, 'departing')}
                    value={state.departing.name}
                    error={checkValidField('departing')}
                  />

                  <Label>Destination</Label>
                  <Places
                    label='Destination'
                    onChange={location =>
                      onSetLocation(location, 'destination')}
                    value={state.destination.name}
                    error={checkValidField('destination')}
                  />

                  <Label>Date of departure</Label>
                  <DateInput>
                    <DatePicker
                      selected={state.date_departure}
                      onChange={date =>
                        handleDateChange(date, 'date_departure')}
                    />
                  </DateInput>

                  <Label>Date of return</Label>
                  <DateInput>
                    <DatePicker
                      selected={state.date_return}
                      onChange={date => handleDateChange(date, 'date_return')}
                    />
                  </DateInput>

                  <Label>How many are going</Label>
                  <Input
                    label='No. Surfers'
                    onChange={onInputChange}
                    value={state.surferCount}
                    fieldName={'surferCount'}
                    type='number'
                    error={checkValidField('surferCount')}
                  />

                  <Label>GENDER RESTRICTION</Label>
                  <ButtonGroupRow>
                        <ButtonGroup 
                          action={onGenderPress}
                          items={genders}
                          selected={genderSelected}
                        />
                      </ButtonGroupRow>
                  <Label>SPECIFIC SURF MODALITY</Label>
                  <ButtonGroupRow>
                        <ButtonGroup 
                          action={onModalityPress}
                          items={modality}
                          selected={modalitySelected}
                        />
                      </ButtonGroupRow>
                  <Label>Skill level</Label>
                  <ButtonGroupRow>
                          <ButtonGroup 
                            action={onSurfLevelPress}
                            items={surfLevel}
                            selected={surfLevelSelected}
                          />
                      </ButtonGroupRow>
                  <Label>TRANSPORT</Label>
                      <ButtonGroupRow>
                        <ButtonGroup 
                          action={onTransportPress}
                          items={transport}
                          selected={transportSelected}
                        />
                      </ButtonGroupRow>
                  <Label>Offering Rides</Label>
                  <Label>Avalible Seats</Label>
                  <Input
                    label='No. Seats'
                    onChange={onInputChange}
                    value={state.avalibleSeats}
                    fieldName={'avalibleSeats'}
                    type='number'
                    error={checkValidField('avalibleSeats')}
                  />
                  <Label>Accomodation</Label>
                  <ButtonGroupRow>
                        <ButtonGroup 
                          action={onAccommodationPress}
                          items={accomodation}
                          selected={accomodationSelected}
                        />
                      </ButtonGroupRow>
                  <Label>Trip Description</Label>
                  <Input
                    label='Any more details?'
                    onChange={onInputChange}
                    value={state.details}
                    fieldName={'details'}
                    error={checkValidField('details')}
                  />
                </Card>
              </div>
            </Container>
          ) : (
            <Spring
              from={{
                opacity: 0,
                transform: 'translate3d(0,120px,0) scale(0.9)'
              }}
              to={{
                opacity: 1,
                transform: 'translate3d(0,40px,0) scale(1)'
              }}>
              {props => (
                <div className={'trip__success'} style={props}>
                  <div className={'trip__success-content'}>
                    <Card>
                      <div className={'trip__icon'}>
                        {Tools.renderIcon('face_happy')}
                      </div>
                      <Heading title='GREAT!' />
                      <div className='trip__complete'>
                        Your trip has been updated.
                      </div>
                      <div className={'trip__button'}>
                        <Button
                          onPress={onCompleteButton}
                          title='VIEW MY TRIPS'
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </Spring>
          )}
        </ContentContainer>
      </ScrollContainer>
      {!editSuccess &&
      <ButtonFooter>
        {!loading ? (
          <>
           <div className={'trip__button'}>
              <Button
                onPress={() => setModalVisible(true)}
                title='DELETE'
                color={Colors.RED_DARK}
                hoverColor={Colors.RED_BASE}
              />
              <div className='__block' />
              <Button onPress={onEditPress} title='UPDATE' />
            </div>
          </>
        ) : (
          <div className={'trip__loader'}>
            <Preloader />
          </div>
        )}
      </ButtonFooter>
      }
      <Modal
        visible={modalVisible}
        title={'Delete Your Trip'}
        sub={'are you sure you want to remove this trip?'}
        buttonNo='CANCEL'
        buttonYes={'DELETE'}
        onNoPress={() => setModalVisible(false)}
        onYesPress={onDeletePress}
      />
    </Trip>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions ])
)(withRouter(EditTripScreen))
