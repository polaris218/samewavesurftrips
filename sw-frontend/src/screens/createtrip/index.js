import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { Spring } from 'react-spring/renderprops'

import { tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes, Types, Colors } from 'config'
import { Tools } from 'utils'
import {
  ScrollContainer,
  Button,
  Container,
  Input,
  Places,
  Select,
  Card,
  Heading,
  Header,
  Preloader,
  ProgressBar
} from 'components'
import {
  ButtonRow,
  Label,
  Trip,
  DateInput,
  ContentContainer,
  Step,
  Steps,
  Title,
  Error
} from './styles'

const CreateTripScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ createSuccess, setCreateSuccess ] = useState(false)
  const [ state, setState ] = useState({
    title: '',
    departing: 'Where are you starting your trip?',
    destination: 'Where would you like to surf?',
    date_departure: new Date(),
    date_return: new Date(),
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
  const scoller = useRef(null)
  const [ step, setStep ] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setStep(1)
    }, 500)
  }, [])

  const onCreatePress = () => {
    setLoading(true)

    const data = {
      authtoken: props.user.accessToken,
      departing: state.departing,
      departure_date_time: state.date_departure,
      return_date_time: state.date_return,
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
    if (data.title === '') errors.push('title')
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

  const onSelectChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onCompleteButton = () => {
    props.history.push('/' + Routes.SURFTRIPS)
  }

  const onNextPress = () => {
    setStep(step + 1)
    scoller.current.scrollTo(0, 0)
  }

  const onBackPress = () => {
    setStep(step - 1)
  }

  const handleDateChange = (date, field) => {
    setState({
      ...state,
      [field]: date
    })
  }

  return (
    <Trip>
      <ScrollContainer
        ref={scoller}
        color='orange'
        navbar={false}
        align='center'>
        <Header
          nav={false}
          backButton
          homeButton={false}
          title='Create your Trip'
        />
        <ContentContainer>
          {!createSuccess ? (
            <Container noPadd>
              <div className='trip__container'>
                <Steps>
                  <ProgressBar current={step} total={4} />
                  <span>step {step} / 4</span>
                </Steps>
                <Card marginBottom={80}>
                  {(step === 1 || step === 0) && (
                    <Step>
                      <Title>Name your Surf Trip & enter the location</Title>
                      <Label>TRIP TITLE</Label>
                      <Input
                        label='Give this trip a name? '
                        onChange={onInputChange}
                        value={state.title}
                        fieldName={'title'}
                        error={checkValidField('title')}
                      />
                      <Label>DEPARTING POINT</Label>
                      <Places
                        label='Departing'
                        onChange={location =>
                          onSetLocation(location, 'departing')}
                        value={state.departing}
                        error={checkValidField('departing')}
                      />
                      <Label>DESTINATION</Label>
                      <Places
                        label='Destination'
                        onChange={location =>
                          onSetLocation(location, 'destination')}
                        value={state.destination}
                        error={checkValidField('destination')}
                      />
                      <Title>When will it take place?</Title>
                      <Label>FROM</Label>
                      <DateInput>
                        <DatePicker
                          selected={state.date_departure}
                          onChange={date =>
                            handleDateChange(date, 'date_departure')}
                        />
                      </DateInput>
                      <Label>TO</Label>
                      <DateInput>
                        <DatePicker
                          selected={state.date_return}
                          onChange={date =>
                            handleDateChange(date, 'date_return')}
                        />
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
                      <Select
                        items={Types.gender}
                        fieldName={'gender'}
                        placeholder={'Gender'}
                        error={checkValidField('gender')}
                        onChange={onSelectChange}
                      />
                      <Label>SPECIFIC SURF MODALITY</Label>
                      <Select
                        items={Types.modality}
                        fieldName={'modality'}
                        placeholder={'Surf Modality'}
                        error={checkValidField('modality')}
                        onChange={onSelectChange}
                      />
                      <Label>SPECIFIC SURF LEVEL</Label>
                      <Select
                        items={Types.surfLevel}
                        fieldName={'level'}
                        placeholder={'Surf Level'}
                        error={checkValidField('level')}
                        onChange={onSelectChange}
                      />
                    </Step>
                  )}
                  {step === 3 && (
                    <Step>
                      <Title>Travel & accomodation</Title>
                      <Label>ARE YOU OFFERING RIDES?</Label>
                      <Label>Avalible Seats</Label>
                      <Input
                        label='No. Seats'
                        onChange={onInputChange}
                        value={state.available_seats}
                        fieldName={'available_seats'}
                        type='number'
                        error={checkValidField('available_seats')}
                      />
                      <Label>Accomodation</Label>
                      <Input
                        label='Accomodation'
                        onChange={onInputChange}
                        value={state.accomodation}
                        fieldName={'accomodation'}
                        error={checkValidField('accomodation')}
                      />
                    </Step>
                  )}
                  {step === 4 && (
                    <Step>
                      <Title>Any extra details you would like to add? </Title>
                      <Label>SURF TRIP BIO</Label>
                      <Input
                        label='Something cool about the surfers or location?'
                        onChange={onInputChange}
                        value={state.trip_details}
                        fieldName={'trip_details'}
                        error={checkValidField('trip_details')}
                        multiline={true}
                        rows={5}
                      />
                    </Step>
                  )}
                </Card>
                {!loading ? (
                  <div className={'trip__button'}>
                    {step === 4 ? (
                      <ButtonRow>
                        <Button outline onPress={onBackPress} title='PREV' />
                        <Button
                          primary
                          onPress={onCreatePress}
                          title='CREATE'
                        />
                      </ButtonRow>
                    ) : (
                      <ButtonRow>
                        <Button
                          disabled={step === 1 || step === 0}
                          color={Colors.GREY_LIGHT}
                          hoverColor={Colors.GREY_BASE}
                          onPress={onBackPress}
                          title='PREV'
                        />
                        <Button onPress={onNextPress} title='NEXT' />
                      </ButtonRow>
                    )}
                    {state.invalid.length !== 0 && (
                      <Error>* check all fields have been filed</Error>
                    )}
                  </div>
                ) : (
                  <div className={'trip__loader'}>
                    <Preloader />
                  </div>
                )}
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
                        Your trip has been created,<br />sit back, chill and<br />
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
    </Trip>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ tripActions ])
)(withRouter(CreateTripScreen))
