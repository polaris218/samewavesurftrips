import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiForgotQuery } from 'api/thunks/general'
import { General as config } from 'config'

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

const ResetPasswordScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    password: '',
    passwordConfirm: '',
    token: '',
    error: false,
    valid: {
      password: true
    },
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
  // function password(){
  //   console.log("Forgot Run1=",state.password);
  //   console.log("Forgot Run1=",state.cpassword);

  // }
  const validateInputs = () => {
     if (state.password !== state.passwordConfirm || state.password === '') {
      setState({
        ...state,
        valid: {
          ...state.valid,
          password: false
        }
      })
      return false
    }

    return true
  }
  const onResetPress = () => {
    console.log("aa=",props.location.search.split('?token=')[1]);
    state.token=props.location.search.split('?token=')[1];

    if(!state.token){
    return;
    }

    const validForm = validateInputs()
    if (validForm) {
      const data = {
        password: state.password,
        token: state.token
      }

      setState({
        ...state,
        error: false
      })

      dispatch(
        apiForgotQuery(data, props.userReset, config.EndPoints.reset, onResetResult)
      )
    }
    // if(state.password.trim() ==state.cpassword.trim()){
    //   const data = {
    //     password: state.password
    //   }
    //   setLoading(true)
    //   // TODO: ADD API FORGOT
    //   // setTimeout(() => setLoading(false), 800)
    //   dispatch(
    //     apiForgotQuery(data, props.userForgot, config.EndPoints.forgot, onResetResult)
    //   )
    // }else{
    //   console.log("Password Not Matched");
    // }

  }

    const onResetResult = error => {
      if (error) {
        console.log("error");
        setLoading(false)
        setState({
          ...state,
          error
        })
      }
    }

  // const onEmailChange = email => {
  //   setState({ ...state, email })
  // }
  const onInputChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
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
            <Label>Reset Password  </Label>
            <Input label='Password' type='password' onChange={onInputChange} fieldName={'password'} error={!state.valid.password}/>
            <Input label='Confirm Password' type='password' value={state.passwordConfirm} onChange={onInputChange} fieldName={'passwordConfirm'} error={!state.valid.password} />
            <Button onPress={onResetPress} title='Reset' primary />
            {state.error && ( <p className='onboard__error'>{state.errorMsg}</p>  )}
            <div className='onboard__account'>
                  <Button onPress={onLoginPress} title='LOGIN' outline />
            </div>
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

ResetPasswordScreen.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

ResetPasswordScreen.defaultProps = {
  history: {},
  location: ''
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(ResetPasswordScreen))
