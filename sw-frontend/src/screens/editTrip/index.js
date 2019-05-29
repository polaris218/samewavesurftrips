import React, { useState } from 'react'
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
  Container,
  Input,
  Places,
  Select,
  Card,
  Heading,
  Header,
  Preloader,
  Modal
} from 'components'
import { Label, Trip, DateInput, ContentContainer } from './styles'

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
      surf_level: state.level,
      surf_modality: state.modality,
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
    if (error) {
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
    if (data.title === '') errors.push('title')
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

  const onSelectChange = (value, name) => {
    setState({
      ...state,
      [name]: value
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
      <ScrollContainer color={'orange'} navbar={false} align={'center'}>
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
                <Card marginBottom={80}>
                  <Label>Title</Label>
                  <Input
                    label='Trip Title'
                    onChange={onInputChange}
                    value={state.title}
                    fieldName={'title'}
                    error={checkValidField('title')}
                  />

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

                  <Label>Prefered gender</Label>
                  <Select
                    items={[ 'Any', ...Types.gender ]}
                    fieldName={'gender'}
                    placeholder={state.gender}
                    error={checkValidField('gender')}
                    onChange={onSelectChange}
                  />
                  <Label>Board type recommended</Label>
                  <Select
                    items={[ ...Types.modality ]}
                    fieldName={'modality'}
                    placeholder={state.modality}
                    error={checkValidField('modality')}
                    onChange={onSelectChange}
                  />
                  <Label>Skill level</Label>
                  <Select
                    items={[ 'Any', Types.surfLevel ]}
                    fieldName={'level'}
                    placeholder={state.level}
                    error={checkValidField('level')}
                    onChange={onSelectChange}
                  />
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
                  <Input
                    label='Accomodation'
                    onChange={onInputChange}
                    value={state.accomodation}
                    fieldName={'accomodation'}
                    error={checkValidField('accomodation')}
                  />
                  <Label>Trip Description</Label>
                  <Input
                    label='Any more details?'
                    onChange={onInputChange}
                    value={state.details}
                    fieldName={'details'}
                    error={checkValidField('details')}
                  />

                  {!loading ? (
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
                  ) : (
                    <div className={'trip__loader'}>
                      <Preloader />
                    </div>
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
