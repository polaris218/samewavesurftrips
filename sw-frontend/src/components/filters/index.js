import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { Button, ButtonGroup, Header } from 'components'
import { ButtonFooter, ButtonGroupRow, Content, Label, Filters } from './styles'
import { Tools } from 'utils'
import { apiQuery } from 'api/thunks/general'
import { General as config, Colors, Types } from 'config'

const FiltersComponent = props => {
  const [ state, setState ] = useState({
    gender: props.gender || '',
    surf_level: props.surf_level || '',
    surf_modality: props.surf_modality || '',
    stance: props.stance || ''
  })
  const [ genderOptions, setGenders ] = useState([])
  const [ genderSelected, setGenderSelected ] = useState(0)
  const [ modality, setModality ] = useState([])
  const [ modalitySelected, setModalitySelected ] = useState(0)
  const [ surfLevel, setSurfLevel ] = useState([])
  const [ surfLevelSelected, setSurfLevelSelected ] = useState(0)
  const [ transport, setTransport ] = useState([])
  const [ transportSelected, setTransportSelected ] = useState(0)
  const [ accomodation, setAccomodation ] = useState([])
  const [ accomodationSelected, setAccomodationSelected ] = useState(0)

  useEffect(() => {
    // Gender
    const tempGenders = []
    Types.tripGenders.forEach((gender, i) => {
      tempGenders.push({
        title: gender
      })
      if (props.gender === gender) setGenderSelected(i)
      // console.log(props.gender, gender, i)
    })
    setGenders(tempGenders)

    //Modailty
    const tempMods = []
    Types.modality.forEach((mod, i) => {
      tempMods.push({
        title: mod
      })
      if (props.surf_modality === mod) setModalitySelected(i)
    })
    setModality(tempMods)

    //SurfLevel
    const levelMods = []
    Types.surfLevel.forEach((level, i) => {
      levelMods.push({
        title: level
      })
      if (props.surf_level === level) setSurfLevelSelected(i)
    })
    setSurfLevel(levelMods)

    //Transport
    const tempTrans = []
    Types.transport.forEach((tran, i) => {
      tempTrans.push({
        title: tran
      })
      if (props.transport === tran) setTransportSelected(i)
    })
    setTransport(tempTrans)

    //Accomodation
    const tempAccom = []
    Types.accomodation.forEach((accom, i) => {
      tempAccom.push({
        title: accom
      })
      if (props.accomodation === accom) setAccomodationSelected(i)
    })
    setAccomodation(tempAccom)
  }, [])

  const onGenderPress = index => {
    setGenderSelected(index)
    setState({
      ...state,
      gender: genderOptions[index].title
    })
  }

  const onModalityPress = index => {
    setModalitySelected(index)
    setState({
      ...state,
      surf_modality: modality[index].title
    })
  }

  const onSurfLevelPress = index => {
    setSurfLevelSelected(index)
    setState({
      ...state,
      surf_level: surfLevel[index].title
    })
  }

  const onAccomodationPress = index => {
    setAccomodationSelected(index)
    setState({
      ...state,
      accomodation: accomodation[index].title
    })
  }

  const onTransportPress = index => {
    setTransportSelected(index)
    setState({
      ...state,
      transport: transport[index].title
    })
  }

  const onClose = () => {
    props.onClose()
  }

  const onFilter = () => {
    setFilterQuery()
  }

  const onFilterReset = () => {
    setAccomodationSelected(0)
    setModalitySelected(0)
    setGenderSelected(0)
    setSurfLevelSelected(0)
    setTransportSelected(0)
  }

  const setFilterQuery = () => {
    let searchParams = ''
    // if (props.trips.search.dateDeparture !== '') {
    //   searchParams += `&departure_date_time=${props.trips.search.dateDeparture}`
    // }
    // if (props.trips.search.dateReturn !== '') {
    //   searchParams += `&return_date_time=${props.trips.search.dateReturn}`
    // }
    // if (props.trips.search.lat !== '')
    //   searchParams += `&lng=${props.trips.search.lng}&lat=${props.trips.search
    //     .lat}`
    if (genderSelected !== 0)
      searchParams += `&gender=${genderOptions[
        genderSelected
      ].title.toLowerCase()}`
    if (modalitySelected !== 0)
      searchParams += `&surf_modality=${modality[
        modalitySelected
      ].title.toLowerCase()}`
    if (surfLevelSelected !== 0)
      searchParams += `&surf_level=${surfLevel[
        surfLevelSelected
      ].title.toLowerCase()}`
    if (transportSelected !== 0)
      searchParams += `&transport=${transport[
        transportSelected
      ].title.toLowerCase()}`
    if (accomodationSelected !== 0)
      searchParams += `&accomodation=${accomodation[
        accomodationSelected
      ].title.toLowerCase()}`

    searchParams = `?${searchParams}`
    dispatch(
      apiQuery(
        searchParams,
        props.filterTrips,
        config.EndPoints.search + searchParams,
        onFilterResult,
        'get'
      )
    )
  }

  const onFilterResult = result => {
    props.onClose()
  }

  return (
    <Filters visible={props.visible}>
      <Header
        nav={false}
        homeButton={false}
        title='Filters'
        rightIcon={Tools.renderIcon('close')}
        rightAction={onClose}
      />
      <Content>
        <Label>Surf Modality</Label>
        <ButtonGroupRow>
          <ButtonGroup
            action={onModalityPress}
            items={modality}
            selected={modalitySelected}
          />
        </ButtonGroupRow>

        <Label>Surf Level</Label>
        <ButtonGroupRow>
          <ButtonGroup
            action={onSurfLevelPress}
            items={surfLevel}
            selected={surfLevelSelected}
          />
        </ButtonGroupRow>

        <Label>Transport</Label>
        <ButtonGroupRow>
          <ButtonGroup
            action={onTransportPress}
            items={transport}
            selected={transportSelected}
          />
        </ButtonGroupRow>

        <Label>Accomodation</Label>
        <ButtonGroupRow>
          <ButtonGroup
            action={onAccomodationPress}
            items={accomodation}
            selected={accomodationSelected}
          />
        </ButtonGroupRow>

        <Label>Gender restriction</Label>
        <ButtonGroupRow>
          <ButtonGroup
            action={onGenderPress}
            items={genderOptions}
            selected={genderSelected}
          />
        </ButtonGroupRow>
      </Content>
      <ButtonFooter>
        <Button
          color={Colors.GREY_BASE}
          onPress={onFilterReset}
          title='RESET'
        />
        <Button onPress={onFilter} title='APPLY' />
      </ButtonFooter>
    </Filters>
  )
}

FiltersComponent.propTypes = {}

FiltersComponent.defaultProps = {
  visible: true,
  onClose: () => {}
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(FiltersComponent)
