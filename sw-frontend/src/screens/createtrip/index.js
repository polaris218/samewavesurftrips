import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import ReactGA from 'react-ga'
import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Types } from 'config'
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
  Preloader
} from 'components'
import {
  ButtonFooter,
  ButtonGroupRow,
  Label,
  Trip,
  DateInput,
  ContentContainer,
  Step,
  // Steps,
  Switch,
  DateIcon,
  Title,
  Error
} from './styles'

const CreateTripScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ createSuccess, setCreateSuccess ] = useState(false)
  const [ state, setState ] = useState({
    title: ' ',
    departureName: 'Where are you starting your trip?',
    destinationName : 'Where would you like to surf?',
    departing: 'Where are you starting your trip?',
    destination: 'Where would you like to surf?',

    surferCount: '',
    gender: '',
    modality: '',
    level: '',
    transport: '',
    accomodation: '',
    offering_rides: false,
    available_seats: 0,
    trip_details: '',
    invalid: [],
    attendees: []
  })
  const [ date_departure, setDate_departure] = useState(null)
  const [ date_return, setDate_return] = useState(null)

  const offeringRides = useRef(null)
  const dateFrom = useRef(null)
  const dateTo = useRef(null)
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
  const scoller = useRef(null)
  const [ step, setStep ] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setStep(1)
    }, 500)

    initDate()

    // Set the Types
    // Gender
    // const GTypes = ['Anyone', 'Only Women', 'Only Men']
    const tempGenders = []
    Types.tripGenders.forEach((gender, i) => {
      tempGenders.push({
        title: gender,
      })
    })
    setGenders(tempGenders)
    //Modailty
    const tempMods = []
    Types.modality.forEach((mod, i) => {
      tempMods.push({
        title: mod,
      })
    })
    setModality(tempMods)
    //Accomodation
    const tempAccom = []
    Types.accomodation.forEach((accom, i) => {
      tempAccom.push({
        title: accom,
      })
    })
    setAccomodation(tempAccom)
    //Transport
    const tempTrans = []
    Types.transport.forEach((trans, i) => {
      tempTrans.push({
        title: trans,
      })
    })
    setTransport(tempTrans)
    //SurfLevel
    const levelMods = []
    Types.surfLevel.forEach((level, i) => {
      levelMods.push({
        title: level,
      })
    })
    setSurfLevel(levelMods)
  }, [])

  useEffect(() => {
    if(step === 1) initDate()
  }, [step])

  const initDate = () => {
    // eslint-disable-next-line no-unused-vars
    const dateInitFrom = window.M.Datepicker.init(dateFrom.current, {
      onSelect: onDateFrom,
      minDate: new Date()
    })
    // eslint-disable-next-line no-unused-vars
    const dateInitTo = window.M.Datepicker.init(dateTo.current, {
      onSelect: onDateTo,
      minDate: new Date()
    })
  }

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

  const onTransportPress = (index) => {
    setTransportSelected(index)
    setState({
      ...state,
      transport: transport[index] && transport[index].title
    })
  }

  const onSurfLevelPress = (index) => {
    setSurfLevelSelected(index)
    setState({
      ...state,
      surf_level: surfLevel[index].title
    })
  }

  const onCreatePress = () => {
    setLoading(true)

    const data = {
      authtoken: props.user.accessToken,
      departing: state.departing,
      departure_date_time: date_departure,
      return_date_time: date_return,
      destination: state.destination,
      gender: state.gender,
      number_of_surfers: state.surferCount,
      surf_level: state.level,
      surf_modality: state.modality,
      title: state.title,
      transport: state.transport,
      accomodation: state.accomodation,
      offering_rides: state.offering_rides,
      available_seats: state.available_seats,
      trip_details: state.trip_details,
      attendees: [ props.user.id ]
    }

    //Validate from .....
    const valid = validateForm(data)
    if (valid) {
      // Send
      dispatch(
        apiQuery(data, props.createTrip, config.EndPoints.trips, onTripResult)
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
      setCreateSuccess(true)
    }
  }

  const validateForm = data => {
    const errors = []
    // if (data.title === '') errors.push('title')
    if (
      data.departing === '' ||
      data.departing === 'Where are you starting your trip?'
    )
      errors.push('departing')
    if (
      data.destination === '' ||
      data.destination === 'Where would you like to surf?'
    )
      errors.push('destination')
    if (data.surferCount === '') errors.push('surferCount')
    // if (data.gender === '') errors.push('gender')
    if (data.modality === '') errors.push('modality')
    if (data.level === '') errors.push('level')

    if (errors.length > 0) {
      console.log('errors in form', errors)
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
      [field]: JSON.stringify(location),
      destinationName: field === 'destination' ? location.name : state.destinationName,
      departureName: field === 'departing' ? location.name : state.departureName,
    })
  }

  const onCompleteButton = () => {
    props.history.push('/' + Routes.SURFTRIPS)
    ReactGA.event({
      category: 'Trip',
      action: 'User created a surftrip',
      label: state.title
    })
  }

  const onNextPress = () => {
    setStep(step + 1)
    scoller.current.scrollTo(0, 0)
  }

  const onBackPress = () => {
    setStep(step - 1)
  }

  const onDateFrom = date => {
    setDate_departure(date)
  }
  const onDateTo = date => {
    setDate_return(date)
  }

  const onClose = () => {
    props.history.goBack()
  }

  const onCheckboxChange = (value) => {
    setState({
      ...state,
      offering_rides: offeringRides.current.checked,
    })
  }

  return (
    <Trip>
      <ScrollContainer
        ref={scoller}
        navbar={false}
        align='center'>
        <Header
          nav={false}
          backButton={step > 1}
          backAction={onBackPress}
          homeButton={false}
          title='Create SURF Trip'
          rightIcon={Tools.renderIcon('close')}
          rightAction={onClose}
        />
        <ContentContainer>
          {!createSuccess ? (
            <Container noPadd>
              <div className='trip__container'>
                {/* <Steps>
                  <ProgressBar current={step} total={4} />
                  <span>step {step} / 4</span>
                </Steps> */}
                <Card marginBottom={80} slim>
                  {(step === 1 || step === 0) && (
                    <Step>
                      <Label>DEPARTING POINT</Label>
                      <Places
                        label='Departing'
                        onChange={location =>
                          onSetLocation(location, 'departing')}
                        value={state.departureName}
                        error={checkValidField('departing')}
                      />
                      <Label>DESTINATION</Label>
                      <Places
                        label='Destination'
                        onChange={location =>
                          onSetLocation(location, 'destination')}
                        value={state.destinationName}
                        error={checkValidField('destination')}
                      />
                      <Title>DATES</Title>
                      <Label>FROM</Label>
                      <DateInput>
                        <input
                            ref={dateFrom}
                            type='text'
                            className='datepicker'
                          />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                      <Label>TO</Label>
                      <DateInput>
                        <input
                          ref={dateTo}
                          type='text'
                          className='datepicker'
                        />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                    </Step>
                  )}
                  {step === 2 && (
                    <Step>
                      <Title>Type of surf</Title>
                      <Label>HOW MANY SURFERS YOU WANT TO GO WITH?</Label>
                      <Input
                        label='No. Surfers'
                        onChange={onInputChange}
                        value={state.surferCount}
                        fieldName={'surferCount'}
                        type='number'
                        error={checkValidField('surferCount')}
                      />
                      <Label>ANY GENDER RESTRICTION?</Label>
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
                      <Label>SPECIFIC SURF LEVEL</Label>
                      <ButtonGroupRow>
                          <ButtonGroup 
                            action={onSurfLevelPress}
                            items={surfLevel}
                            selected={surfLevelSelected}
                          />
                      </ButtonGroupRow>
                    </Step>
                  )}
                  {step === 3 && (
                    <Step>
                      <Title>Travel & accomodation</Title>
                      <Label>TRANSPORT</Label>
                      <ButtonGroupRow>
                        <ButtonGroup 
                          action={onTransportPress}
                          items={transport}
                          selected={transportSelected}
                        />
                      </ButtonGroupRow>
                      {state.transport.toLowerCase() === 'car' ?
                      <>
                      <Label>ARE YOU OFFERING RIDES?</Label>
                      <Switch className="switch">
                        <label>
                          NO
                          <input 
                            checked={state.offering_rides}
                            value={state.offering_rides} 
                            onChange={onCheckboxChange}
                            ref={offeringRides} type="checkbox"/>
                          <span className="lever"></span>
                          Yes
                        </label>
                      </Switch>
                      <Label>Avalible Seats</Label>
                      <Input
                        label='No. Seats'
                        onChange={onInputChange}
                        value={state.available_seats && state.available_seats !== 0 ? state.available_seats : ''}
                        fieldName={'available_seats'}
                        type='number'
                        error={checkValidField('available_seats')}
                      />
                      </> : null }
                      <Label>Accomodation</Label>
                      <ButtonGroupRow>
                        <ButtonGroup 
                          action={onAccommodationPress}
                          items={accomodation}
                          selected={accomodationSelected}
                        />
                      </ButtonGroupRow>
                    </Step>
                  )}
                  {step === 4 && (
                    <Step>
                      <Title>Any extra details you would like to add? </Title>
                      <Label>SURF TRIP BIO</Label>
                      <Input
                        label='“You are very close to be ripping somewhere!&#013; &#010;Tell other surfers why this trip is going to be epic!&#013; &#010;Here
                        are some tips:&#013; &#010;-
                        What are you expecting from this trip?&#013; &#010;-
                        How are you going to get there?&#013; &#010;-
                        Where are you planning to stay?&#013; &#010;-
                        Are you planning any stopover?&#013; &#010;-
                        Any other activities you would like to do?
                    '
                        onChange={onInputChange}
                        value={state.trip_details}
                        fieldName={'trip_details'}
                        error={checkValidField('trip_details')}
                        multiline={true}
                        rows={9}
                      />
                    </Step>
                  )}
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
                        {Tools.renderIcon('face_fav')}
                      </div>
                      <Heading title='AWESOME!' />
                      <div className='trip__complete'>
                        Your surf trip has been created,<br />sit back, chill and<br />
                        wait for others to join
                      </div>
                      <div className={'trip__success__button'}>
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
      {!createSuccess &&
      <ButtonFooter>
        {!loading ? (
          <>
            {step === 4 ? (
              <Button primary onPress={onCreatePress} title='POST SURF TRIP' />
            ) : (
              <Button disabled={!date_return || !date_departure} onPress={onNextPress} title='NEXT' />
            )}
            {state.invalid.length !== 0 && (
              <Error>* check all fields have been filed</Error>
            )}
            </>
        ) : (
          <div className={'trip__loader'}>
            <Preloader />
          </div>
        )}
      </ButtonFooter>
      }
    </Trip>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions ])
)(withRouter(CreateTripScreen))
