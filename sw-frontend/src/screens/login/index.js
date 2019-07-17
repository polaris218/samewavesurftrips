import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { useSpring, animated } from 'react-spring'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiSingleQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { Button, Container, Logo, Link, Input, Preloader } from 'components'
import { Routes } from 'config'
import IconFB from 'assets/images/icon_fb.svg'
import { Login, FormContent, LoginLogo } from './styles'

const LoginScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    email: '',
    password: '',
    error: false
  })

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }, [])

  const animatedProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0,0,0) scale(1)',
    from: {
      opacity: 0,
      transform: 'translate3d(0,50px,0) scale(2)'
    },
    delay: 75
  })

  const animatedContentProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0,0,0) scale(1)',
    from: {
      opacity: 0,
      transform: 'translate3d(0,80px,0) scale(1)'
    },
    // reset: resetAnimation,
    delay: 300
  })

  const animatedFooterProps = useSpring({
    opacity: 1,
    transform: 'translate3d(0,0,0) scale(1)',
    from: {
      opacity: 0,
      transform: 'translate3d(0,80px,0) scale(1)'
    },
    // reset: resetAnimation,
    delay: 400
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

  const responseFacebook = data => {
    console.log('Got FB data ', data)
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
      <Container>
        <LoginLogo style={animatedProps}>
          <Logo color='white' icon />
        </LoginLogo>

        {!loading ? (
          <FormContent style={animatedContentProps}>
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
                  isMobile={false}
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
          </FormContent>
        ) : (
          <div className={'login__form'}>
            <Preloader color={'white'} />
          </div>
        )}
        <FormContent style={animatedFooterProps}>
          <div className='login__register'>
            <p>Don't have an account?</p>
            <Button onPress={onRegisterPress} title='SIGN UP' outline />
          </div>
        </FormContent>
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
