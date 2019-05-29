import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { General as config, Routes } from 'config'
import { Tab } from 'components'
import { Navigation, Tabs } from './styles'

const NavigationComponent = props => {
  const [ visible ] = useState(true)

  const onTabPress = screen => {
    props.history.push('/' + screen)
  }

  if (
    !props.accessToken ||
    props.location.pathname === `/${Routes.ONBOARD}` ||
    props.location.pathname === `/${Routes.LOGIN}` ||
    props.location.pathname === `/${Routes.CREATE}` ||
    props.location.pathname === `/${Routes.EDIT_TRIP}`
    // || props.location.pathname === `/${Routes.TRIP}/`
  ) {
    return null
  }

  console.log('props.location.pathname,', props.location.pathname)

  return (
    <Navigation visible={visible}>
      <Tabs>
        <Tab
          active={props.location.pathname}
          icon='home'
          title={Routes.DASHBOARD}
          onTabPress={() => onTabPress(Routes.DASHBOARD)}
        />
        <Tab
          active={props.location.pathname}
          icon='trips'
          title={Routes.SURFTRIPS}
          onTabPress={() => onTabPress(Routes.SURFTRIPS)}
        />
        <Tab
          active={props.location.pathname}
          icon='mail'
          title={Routes.MAIL}
          onTabPress={() => onTabPress(Routes.MAIL)}
        />
        <Tab
          active={props.location.pathname}
          icon='profile'
          userImg={
            props.userImg && config.EndPoints.digitalOcean + props.userImg
          }
          title={Routes.PROFILE}
          onTabPress={() => onTabPress(Routes.PROFILE)}
        />
      </Tabs>
    </Navigation>
  )
}

NavigationComponent.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  accessToken: PropTypes.string,
  userImg: PropTypes.string
}

NavigationComponent.defaultProps = {
  history: {},
  location: '',
  accessToken: null,
  userImg: null
}

export default withRouter(NavigationComponent)
