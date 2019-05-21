import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import {
  BackgroundImage,
  Button,
  Container,
  Input,
  Logo,
  Link,
  Preloader
} from 'components'
import { Routes } from 'config'
import { Tools } from 'utils'
import { Onboard } from './styles'

const OnboardingScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: false,
    valid: {
      firstName: true,
      lastName: true,
      email: true,
      password: true
    },
    errorMsg: "woooah wipeout! couldn't register you at this time :("
  })

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }, [])

  const onLinkPress = link => {
    let route

    switch (link) {
      case 'terms':
        route = Routes.TERMS
        break
      case 'data':
        route = Routes.PRIVACY
        break
      case 'privacy':
        route = Routes.PRIVACY
        break
      default:
        route = Routes.LOGIN
        break
    }

    props.history.push('/' + route)
  }

  const onLoginPress = () => {
    props.history.push('/' + Routes.LOGIN)
  }

  const validateInputs = () => {
    if (state.firstName === '') {
      setState({
        ...state,
        valid: {
          ...state.valid,
          firstName: false
        }
      })
      return false
    }
    if (state.lastName === '') {
      setState({
        ...state,
        valid: {
          ...state.valid,
          firstName: true,
          lastName: false
        }
      })
      return false
    }
    if (state.email === '' || !Tools.validateEmail(state.email)) {
      setState({
        ...state,
        valid: {
          ...state.valid,
          firstName: true,
          lastName: true,
          email: false
        }
      })
      return false
    }
    if (state.password !== state.passwordConfirm || state.password === '') {
      setState({
        ...state,
        valid: {
          ...state.valid,
          firstName: true,
          lastName: true,
          email: true,
          password: false
        }
      })
      return false
    }

    return true
  }

  const onSignupPress = () => {
    const validForm = validateInputs()
    if (validForm) {
      const data = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email.toLowerCase(),
        password: state.password,
        gender: 'unknown'
      }

      setState({
        ...state,
        error: false
      })

      dispatch(
        apiQuery(data, props.userSignup, config.EndPoints.users, onSignupResult)
      )
    }
  }

  const onSignupResult = error => {
    if (error) {
      setState({
        ...state,
        error
      })
      setLoading(false)
    } else {
      setState({
        ...state,
        success: true
      })
      setLoading(false)
      console.log('success', error)
    }
    console.log('err__', error)
  }

  const onInputChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <Onboard>
      <BackgroundImage blur={0} opacity={0.3} />
      <Container>
        <div className={'onboard__logo'}>
          <Logo color='white' icon />
        </div>
        {state.success ? (
          <div className={'onboard_success'}>
            <h3>AWESOME!</h3>
            <p className={'onboard_success-info'}>
              you can now login to your account
            </p>
            <Button onPress={onLoginPress} title='LOGIN' />
          </div>
        ) : (
          <div className={'onboard__form'}>
            {loading ? (
              <div className={'onboard__form'}>
                <Preloader />
              </div>
            ) : (
              <div className={'onboard__form'}>
                <Input
                  label='First Name'
                  onChange={onInputChange}
                  fieldName={'firstName'}
                  value={state.firstName}
                  error={!state.valid.firstName}
                />
                <Input
                  label='Last Name'
                  onChange={onInputChange}
                  fieldName={'lastName'}
                  value={state.lastName}
                  error={!state.valid.lastName}
                />
                <Input
                  label='Email address'
                  onChange={onInputChange}
                  fieldName={'email'}
                  value={state.email}
                  error={!state.valid.email}
                />
                <Input
                  label='Password'
                  type='password'
                  onChange={onInputChange}
                  fieldName={'password'}
                  error={!state.valid.password}
                />
                <Input
                  label='Confirm Password'
                  type='password'
                  value={state.passwordConfirm}
                  onChange={onInputChange}
                  fieldName={'passwordConfirm'}
                  error={!state.valid.password}
                />
                <Button onPress={onSignupPress} title='SIGN UP' primary />
                {state.error && (
                  <p className='onboard__error'>{state.errorMsg}</p>
                )}
                <p className='onboard__privacy'>
                  By signing up you agree to our<br />
                  <Link onClick={onLinkPress.bind(this, 'terms')}>Terms</Link>,
                  &nbsp;
                  <Link onClick={onLinkPress.bind(this, 'data')}>
                    Data Policy
                  </Link>{' '}
                  and &nbsp;
                  <Link onClick={onLinkPress.bind(this, 'privacy')}>
                    Privacy Policy
                  </Link>
                </p>
                <div className='onboard__account'>
                  <p>Already have an account?</p>
                  <Button onPress={onLoginPress} title='LOGIN' outline />
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </Onboard>
  )
}

OnboardingScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

OnboardingScreen.defaultProps = {
  history: {},
  location: ''
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(OnboardingScreen))
