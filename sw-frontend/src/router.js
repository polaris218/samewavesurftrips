import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { App, Navigation } from 'components'
import {
  Dashboard,
  Login,
  Search,
  SurfTrips,
  Profile,
  Onboarding,
  Terms,
  Privacy,
  Trip,
  CreateTrip,
  Mail,
  EditTrip,
  EditProfile
} from 'screens'
import { Routes } from 'config'
import 'assets/style/app.css'

const AppRouter = props => {
  console.log('PROPS', props)
  return (
    <Router>
      <App accessToken={props.user.accessToken}>
        {/* <Route
          path={`/`}
          component={props.user.accessToken ? Dashboard : Login}
        />*/}
        <Route
          exact
          path='/'
          render={() =>
            props.user.accessToken ? (
              <Redirect to={`/${Routes.DASHBOARD}`} />
            ) : (
              // <Redirect to={`/${Routes.LOGIN}`} />
              <Login />
            )}
        />
        <Route path={`/${Routes.DASHBOARD}`} component={Dashboard} />
        <Route path={`/${Routes.LOGIN}`} component={Login} />
        <Route path={`/${Routes.ONBOARD}`} component={Onboarding} />
        <Route exact path={`/${Routes.SEARCH}`} component={Search} />
        <Route path={`/${Routes.SEARCH}/:id`} component={Search} />
        <Route path={`/${Routes.TRIP}/:id`} component={Trip} />
        <Route path={`/${Routes.CREATE}`} component={CreateTrip} />
        <Route path={`/${Routes.EDIT_TRIP}`} component={EditTrip} />
        <Route exact path={`/${Routes.SURFTRIPS}`} component={SurfTrips} />
        <Route exact path={`/${Routes.PROFILE}`} component={Profile} />
        <Route exact path={`/${Routes.EDIT_PROFILE}`} component={EditProfile} />
        <Route exact path={`/${Routes.MAIL}`} component={Mail} />
        <Route exact path={`/${Routes.TERMS}`} component={Terms} />
        <Route exact path={`/${Routes.PRIVACY}`} component={Privacy} />
        <Navigation accessToken={props.user.accessToken} />
      </App>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(AppRouter)
