import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Routes, General as Config } from 'config'
import { App } from './styles'

const AppComponent = props => {
  useEffect(() => {
    // Setup Google Tracking
    ReactGA.initialize(Config.GA_ID)
  }, [])

  useEffect(
    () => {
      // If not logged in, reset the route
      if (
        !props.accessToken &&
        (props.location.pathname !== `/${Routes.ONBOARD}` &&
          props.location.pathname !== `/${Routes.LOGIN}` &&
          props.location.pathname !== `/${Routes.FORGOT}` &&
          props.location.pathname !== `/${Routes.AUTH}` &&
          props.location.pathname !== `/${Routes.PRIVACY}` &&
          props.location.pathname !== `/${Routes.RESET_PASSWORD}` &&
          props.location.pathname !== `/${Routes.TERMS}` &&
          !props.location.pathname.includes(`/${Routes.TRIP}/`))
      ) {
        props.history.push('/')
      }
    },
    [ props.accessToken ]
  )

  return <App>{props.children}</App>
}

AppComponent.propTypes = {
  accessToken: PropTypes.string
}

AppComponent.defaultProps = {
  accessToken: null
}

export default withRouter(AppComponent)
