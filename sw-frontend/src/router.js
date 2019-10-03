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
  EditProfile,
  Forgot,
  Message,
  ResetPassword,
  Users
} from 'screens'
import { Routes, General as Config } from 'config'
import Analytics from 'react-router-ga'
import 'assets/style/materialize.css'
import 'assets/style/app.css'

const AppRouter = props => {
  return (
    <Router>
      <Analytics id={Config.GA_ID} debug>
        <App accessToken={props.user.accessToken}>
          <Route
            exact
            path='/'
            render={() =>
              props.user.accessToken ? (
                <Redirect to={`/${Routes.DASHBOARD}`} />
              ) : (
                <Login />
              )}
          />
          <Route path={`/${Routes.DASHBOARD}`} component={Dashboard} />
          <Route path={`/${Routes.LOGIN}`} component={Login} />
          <Route path={`/${Routes.FORGOT}`} component={Forgot} />
          <Route path={`/${Routes.AUTH}`} component={Login} />
          <Route path={`/${Routes.RESET_PASSWORD}`} component={ResetPassword} />
          <Route path={`/${Routes.ONBOARD}`} component={Onboarding} />
          <Route exact path={`/${Routes.SEARCH}`} component={Search} />
          <Route path={`/${Routes.SEARCH}/:id`} component={Search} />
          <Route path={`/${Routes.TRIP}/:id`} component={Trip} />
          <Route path={`/${Routes.CREATE}`} component={CreateTrip} />
          <Route path={`/${Routes.EDIT_TRIP}`} component={EditTrip} />
          <Route exact path={`/${Routes.SURFTRIPS}`} component={SurfTrips} />
          <Route exact path={`/${Routes.PROFILE}`} component={Profile} />
          <Route exact path={`/${Routes.USER}/:userId`} component={Profile} />
          <Route path={`/${Routes.USERS}`} component={Users} />
          <Route
            exact
            path={`/${Routes.EDIT_PROFILE}`}
            component={EditProfile}
          />
          <Route exact path={`/${Routes.MAIL}`} component={Mail} />
          <Route
            exact
            path={`/${Routes.MESSAGE}/:messageId`}
            component={Message}
          />
          <Route exact path={`/${Routes.TERMS}`} component={Terms} />
          <Route exact path={`/${Routes.PRIVACY}`} component={Privacy} />
          <Navigation
            accessToken={props.user.accessToken}
            userImg={props.user.avatar}
          />
          {/* <Footer accessToken={props.user.accessToken} /> */}
        </App>
      </Analytics>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(AppRouter)
