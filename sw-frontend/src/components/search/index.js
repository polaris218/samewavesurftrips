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

import { Button, Container, ScrollContainer, Select, Places } from 'components'
import {
  SearchContainer,
  SearchContent,
  Label,
  FilterButton,
  DateInput,
  ContentContainer
} from './styles'

const SearchComponent = props => {
  const [ loading, setLoading ] = useState(false)
  const [ selectGender, setSelectGender ] = useState(null)
  const [ selectModality, setSelectModality ] = useState(null)
  const [ selectLevel, setSelectLevel ] = useState(null)
  const [ dateDeparture, setDateDeparture ] = useState(null)
  const [ dateReturn, setDateReturn ] = useState(null)
  const [ locationDeparture, setLocationDeparture ] = useState({ name: null })
  const [ locationReturn, setLocationReturn ] = useState({ name: null })

  // useEffect(() => {
  //   fetchTrips();
  // }, [])

  const onClearPress = () => {
    setDateDeparture(null)
    setDateReturn(null)
    setLocationDeparture({ name: null })
    setLocationReturn({ name: null })
    setSelectGender(null)
    setSelectModality(null)
    setSelectLevel(null)
  }

  const onFilterPress = () => {
    let searchParams = ''
    console.log('locationReturn', locationDeparture, locationReturn)
    if (locationReturn.lat)
      searchParams += `&lng=${locationReturn.lng}&lat=${locationReturn.lat}&radius=15`
    if (!isEmpty(selectGender)) searchParams += `&gender=${selectGender}`
    if (!isEmpty(selectModality))
      searchParams += `&surf_modality=${selectModality}`
    if (!isEmpty(selectLevel)) searchParams += `&surf_level=${selectLevel}`

    searchParams = `?${searchParams}`

    setLoading(true)
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
    props.onFilter()
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

  const startSpring = { transform: 'translate3d(0, -107% ,0)' }
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
          <ScrollContainer navbar={false} color='none'>
            <ContentContainer>
              <Container>
                <div className={'inner__content'}>
                  {/* <Label>Departing from</Label>
                  <Places
                    label='Departing'
                    onChange={location => onSetLocation(location, 'departing')}
                    value={locationDeparture.name}
                  /> */}
                  <Label>Destination</Label>
                  <Places
                    label='Destination'
                    onChange={location =>
                      onSetLocation(location, 'destination')}
                    value={locationReturn.name}
                  />
                  <Label>Departing date</Label>
                  <DateInput>
                    <DatePicker
                      selected={dateDeparture}
                      onChange={date => handleDateChange(date, 'departing')}
                    />
                  </DateInput>
                  <Label>Return date</Label>
                  <DateInput>
                    <DatePicker
                      selected={dateReturn}
                      onChange={date => handleDateChange(date, 'destination')}
                    />
                  </DateInput>
                  <Label>Prefered gender</Label>
                  <Select
                    items={[ 'Any', ...Types.gender ]}
                    fieldName={'gender'}
                    placeholder={'Gender'}
                    onChange={onSelectChange}
                  />
                  <Label>Board type</Label>
                  <Select
                    items={[ 'Any', ...Types.modality ]}
                    fieldName={'modality'}
                    placeholder={'Surf Modality'}
                    onChange={onSelectChange}
                  />
                  <Label>Skill level</Label>
                  <Select
                    items={[ 'Any', ...Types.surfLevel ]}
                    fieldName={'level'}
                    placeholder={'Surf Level'}
                    onChange={onSelectChange}
                  />
                  <FilterButton>
                    <Button
                      title={'CLEAR'}
                      onPress={onClearPress}
                      color={Colors.RED_BASE}
                      hoverColor={Colors.RED_DARK}
                    />
                    <Button primary title={'FILTER'} onPress={onFilterPress} />
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

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(SearchComponent)
