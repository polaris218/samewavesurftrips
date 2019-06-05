import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions, mapDispatchToProps } from 'api/actions'
// import { dispatch } from 'api/store'
// import { apiQuery } from 'api/thunks/general'
// import { General as config } from 'config'
import {
  BackgroundImage,
  Button,
  Container,
  Logo,
  Input,
  Preloader
} from 'components'
import { Routes } from 'config'
import { Forgot, Label } from './styles'

const ForgotScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    email: '',
    password: '',
    error: false
  })

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }, [])

  useEffect((prevProps, prevState) => {
    if (props.user && props.user.accessToken) {
      console.log('User Log In success')
      props.history.push(`/${Routes.DASHBOARD}`)
    }
  })

  const onLoginPress = () => {
    // const data = {
    //   username: state.email.toLowerCase()
    // }
    setLoading(true)
    // TODO: ADD API FORGOT
    setTimeout(() => setLoading(false), 800)
    // dispatch(
    //   apiQuery(data, props.userLogin, config.EndPoints.auth, onLoginResult)
    // )
  }

  //   const onLoginResult = error => {
  //     if (error) {
  //       setLoading(false)
  //       setState({
  //         ...state,
  //         error
  //       })
  //     }
  //   }

  const onEmailChange = email => {
    setState({ ...state, email })
  }

  return (
    <Forgot>
      <BackgroundImage blur={0} opacity={0.5} />
      <Container>
        <div className={'login__logo'}>
          <Logo color='white' icon />
        </div>

        {!loading ? (
          <div className={'login__form'}>
            <Label>
              Enter your registered email and we will send out instructions on
              resetting access
            </Label>
            <Input
              label='Email address'
              onChange={onEmailChange}
              value={state.email}
            />
            <Button onPress={onLoginPress} title='LOGIN' primary />
          </div>
        ) : (
          <div className={'login__form'}>
            <Preloader color={'white'} />
          </div>
        )}
      </Container>
    </Forgot>
  )
}

ForgotScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

ForgotScreen.defaultProps = {
  history: {},
  location: ''
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(ForgotScreen))
