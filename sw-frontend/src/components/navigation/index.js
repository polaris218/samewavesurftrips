import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
    props.location.pathname === `/${Routes.EDIT_TRIP}` ||
    props.location.pathname.includes(Routes.MESSAGE) ||
    props.location.pathname.includes(`/${Routes.TRIP}/`)
    // || props.location.pathname === `/${Routes.TRIP}/`
  ) {
    return null
  }

  const userAvatar = () => {
    let image = null
    if (props.userImg) {
      if (props.userImg.includes('https://')) return props.userImg
      image = config.EndPoints.digitalOcean + props.userImg
    }

    return image
  }

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
          userImg={userAvatar()}
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
