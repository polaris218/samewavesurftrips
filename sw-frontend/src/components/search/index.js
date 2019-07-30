/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { connect } from 'react-redux'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { useSpring, animated } from 'react-spring'
import DatePicker from 'react-datepicker'
import { General as config, Colors, Types } from 'config'
import { Tools } from 'utils'
import { Button, Container, ScrollContainer, Select, Places } from 'components'
import {
  SearchContainer,
  SearchContent,
  Label,
  FilterButton,
  DateInput,
  ContentContainer,
  Row,
  Column,
  PlaceInput,
  Dates,
  DateIcon
} from './styles'

const SearchComponent = props => {
  const [ loading, setLoading ] = useState(false)
  const [ selectGender, setSelectGender ] = useState(null)
  const [ selectModality, setSelectModality ] = useState(null)
  const [ selectLevel, setSelectLevel ] = useState(null)
  const [ dateDeparture, setDateDeparture ] = useState(null)
  const [ dateReturn, setDateReturn ] = useState(null)
  const [ locationDeparture, setLocationDeparture ] = useState({
    name: 'start location'
  })
  const [ locationReturn, setLocationReturn ] = useState({
    name: 'surf location'
  })

  // useEffect(() => {
  // fetchTrips();
  // }, [])

  const onClearPress = () => {
    setDateDeparture(null)
    setDateReturn(null)
    setLocationDeparture({
      name: null
    })
    locationReturn.name = ''
    setLocationReturn({
      name: null
    })
    setSelectGender(null)
    setSelectModality(null)
    setSelectLevel(null)
  }

  const onFilterPress = () => {
    let searchParams = ''
    let params = {
      dateDeparture: dateDeparture ? dateDeparture.toString() : '',
      dateReturn: dateReturn ? dateReturn.toString() : '',
      lng: locationReturn.lng || '',
      lat: locationReturn.lat || '',
      gender: selectGender || '',
      modality: selectModality || '',
      Level: selectLevel || ''
    }
    if (dateDeparture) {
      searchParams += `&departure_date_time=${dateDeparture}`
    }
    if (dateReturn) {
      searchParams += `&return_date_time=${dateReturn}`
    }
    if (locationReturn.lat)
      searchParams += `&lng=${locationReturn.lng}&lat=${locationReturn.lat}&radius=20`
    if (!isEmpty(selectGender)) searchParams += `&gender=${selectGender}`
    if (!isEmpty(selectModality))
      searchParams += `&surf_modality=${selectModality}`
    if (!isEmpty(selectLevel)) searchParams += `&surf_level=${selectLevel}`

    searchParams = `?${searchParams}`
    setLoading(true)
    // debugger
    dispatch(props.searchDetails({ ...params }))
    dispatch(
      apiQuery(
        null,
        props.filterTrips,
        config.EndPoints.search + searchParams,
        onFilterhResult,
        'get',
        searchParams
      )
    )
  }

  const isEmpty = value => {
    if (value === null || value === '' || value === 'Any') {
      return true
    }
  }

  const onFilterhResult = error => {
    if (error.status !== 200) {
      console.log('what error', error)
    }
    setLoading(false)
    // props.onFilter()
  }

  const onSelectChange = (value, type) => {
    switch (type) {
      case 'gender':
        setSelectGender(value)
        break
      case 'modality':
        setSelectModality(value)
        break
      case 'level':
        setSelectLevel(value)
        break
      default:
        return false
    }
  }

  const handleDateChange = (date, type) => {
    if (type === 'departing') {
      setDateDeparture(date)
    } else {
      setDateReturn(date)
    }
  }

  const onSetLocation = (location, type) => {
    if (type === 'departing') {
      setLocationDeparture(location)
    } else {
      setLocationReturn(location)
    }
  }

  const startSpring = {
    transform: 'translate3d(0, -0% ,0)'
  }
  const springProps = useSpring({
    from: startSpring,
    to: props.visible
      ? startSpring
      : { opacity: 1, transform: 'translate3d(0,0,0)' },
    config: { mass: 0.2, tension: 170, friction: 13 }
  })

  return (
    <SearchContainer interactive={props.visible}>
      <animated.div className={'search__slider'} style={springProps}>
        <SearchContent>
          {' '}
          <ScrollContainer navbar={false} color='none'>
            <ContentContainer>
              <Container>
                <div className={'inner__content'}>
                  <Label>Location </Label>
                  <Column>
                    <PlaceInput>
                      <Places
                        label='Departure'
                        onChange={location =>
                          onSetLocation(location, 'departing')}
                        value={locationDeparture.name}
                      />
                    </PlaceInput>
                    <PlaceInput>
                      <Places
                        label='Destination'
                        onChange={location =>
                          onSetLocation(location, 'destination')}
                        value={locationReturn.name}
                      />
                    </PlaceInput>
                  </Column>
                  <Dates>
                    <Label>Dates </Label>
                    <Row>
                      <DateInput>
                        <DatePicker
                          selected={dateDeparture}
                          onChange={date => handleDateChange(date, 'departing')}
                        />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                      <DateInput>
                        <DatePicker
                          selected={dateReturn}
                          onChange={date =>
                            handleDateChange(date, 'destination')}
                        />
                        <DateIcon>{Tools.renderIcon('calendar')}</DateIcon>
                      </DateInput>
                    </Row>
                  </Dates>
                  {/* <Label> Prefered gender </Label>
                  <Select
                    items={[ 'Any', ...Types.gender ]}
                    fieldName={'gender'}
                    placeholder={'Gender'}
                    onChange={onSelectChange}
                  />
                  <Label> Board type </Label>
                  <Select
                    items={[ 'Any', ...Types.modality ]}
                    fieldName={'modality'}
                    placeholder={'Surf Modality'}
                    onChange={onSelectChange}
                  />
                  <Label> Skill level </Label>
                  <Select
                    items={[ 'Any', ...Types.surfLevel ]}
                    fieldName={'level'}
                    placeholder={'Surf Level'}
                    onChange={onSelectChange}
                  /> */}
                  <FilterButton>
                    <Button
                      title={'CLEAR'}
                      onPress={onClearPress}
                      // color={Colors.RED_BASE}
                      // hoverColor={Colors.RED_DARK}
                      outlineDark
                    />
                    <Button primary title={'SEARCH'} onPress={onFilterPress} />
                  </FilterButton>
                </div>
              </Container>
            </ContentContainer>
          </ScrollContainer>
        </SearchContent>
      </animated.div>
    </SearchContainer>
  )
}

SearchComponent.propTypes = {
  visible: PropTypes.bool,
  onFilter: PropTypes.func
  // fontSize: PropTypes.string,
  // color: PropTypes.string,
}

SearchComponent.defaultProps = {
  visible: true,
  onFilter: () => {}
  // fontSize: Spacings.FONT.BODY,
  // color: Colors.GREY_BASE
}

const mapStateToProps = state => ({ user: state.user, trips: state.trips })

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(SearchComponent)
