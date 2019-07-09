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
    password:'',
    cpassword:'',
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
  function password(){
    console.log("Forgot Run1=",state.password);
    console.log("Forgot Run1=",state.cpassword);

  }

  const onResetPress = () => {
    const data = {
      username: state.password
    }
    setLoading(true)
    // TODO: ADD API FORGOT
    // setTimeout(() => setLoading(false), 800)
    dispatch(
      apiForgotQuery(data, props.userForgot, config.EndPoints.forgot, onResetResult)
    )
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
            <Label>Reset Password  </Label>
            <Input label='Password' onChange={password} value={state.password}/>
            <Input label='Confirm Password' onChange={password} value={state.cpassword}/>
            <Button onPress={onResetPress} title='Reset' primary />
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
