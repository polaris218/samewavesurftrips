import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiSingleQuery } from 'api/thunks/general'
import { General as config } from 'config'
import {
  BackgroundImage,
  Button,
  Container,
  Logo,
  Link,
  Input,
  Preloader
} from 'components'
import { Routes } from 'config'
import IconFB from 'assets/images/icon_fb.svg'
import { Login } from './styles'

const LoginScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    email: '',
    password: '',
    error: false
  })

  const onLoginPress = () => {
    const data = {
      username: state.email.toLowerCase(),
      password: state.password
    }
    setLoading(true)
    dispatch(
      apiSingleQuery(
        data,
        props.userLogin,
        config.EndPoints.auth,
        onLoginResult
      )
    )
  }

  const onLoginResult = res => {
    console.log('login res', res)
    if (res.status !== 200) {
      setLoading(false)
      setState({
        ...state,
        error: true
      })
    } else {
      props.history.push('/' + Routes.DASHBOARD)
    }
  }

  const onRegisterPress = () => {
    props.history.push('/' + Routes.ONBOARD)
  }

  const onForgotPassword = () => {
    props.history.push('/' + Routes.FORGOT)
  }

  const onEmailChange = email => {
    setState({ ...state, email })
  }

  const onPasswordChange = password => {
    setState({ ...state, password })
  }

  const getUrlVars = () => {
    const vars = {}
    // eslint-disable-next-line no-unused-vars
    const parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value
      }
    )
    return vars
  }

  const responseFacebook = data => {
    setLoading(true)
    dispatch(
      apiSingleQuery(
        data,
        props.userLogin,
        `${config.EndPoints.auth}/facebook`,
        onLoginResult
      )
    )
  }

  return (
    <Login>
      {/* <BackgroundImage blur={0} opacity={0.5} /> */}
      <Container>
        <div className={'login__logo'}>
          <Logo color='white' icon />
        </div>

        {!loading ? (
          <div className={'login__form'}>
            <Input
              label='Email address'
              onChange={onEmailChange}
              value={state.email}
            />
            <Input
              label='Password'
              type={'password'}
              onChange={onPasswordChange}
              value={state.password}
            />
            <div className={'login__forgotpw'}>
              <Link onClick={onForgotPassword}>Forgot password</Link>
            </div>
            <Button onPress={onLoginPress} title='LOGIN' />
            <div className={'login__fb'}>
              <FacebookLogin
                appId='877477202605334'
                fields='id,first_name,last_name,email,picture.height(1000)'
                scope='public_profile, email'
                callback={responseFacebook}
                redirectUri={'https://samewave.herokuapp.com/'}
                cssClass='facebook-login-button'
                icon={
                  <img
                    className='button__icon'
                    src={IconFB}
                    height={20}
                    alt='LOGIN WITH FACEBOOK'
                  />
                }
              />
            </div>{' '}
            {state.error && (
              <div className={'login__error'}>
                * Please check your login details
              </div>
            )}
          </div>
        ) : (
          <div className={'login__form'}>
            <Preloader color={'white'} />
          </div>
        )}

        <div className='login__register'>
          <p>Don't have an account?</p>
          <Button onPress={onRegisterPress} title='SIGN UP' outline />
        </div>
      </Container>
    </Login>
  )
}

LoginScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

LoginScreen.defaultProps = {
  history: {},
  location: ''
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(LoginScreen))
