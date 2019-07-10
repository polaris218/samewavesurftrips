import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiForgotQuery } from 'api/thunks/general'
import { General as config } from 'config'

import { BackgroundImage, Button, Container, Logo, Input, Preloader} from 'components';
import { Routes } from 'config'
import { Tools } from 'utils'
import { Forgot, Label } from './styles'

const ForgotScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ state, setState ] = useState({
    email: '',
    error: false,
    valid: {
      email: true
    }
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
    props.history.push('/' + Routes.LOGIN)
  }
  
  const validateInputs = () => {  
    if (state.email === '' || !Tools.validateEmail(state.email)) {
      setState({...state, valid: { ...state.valid,email: false,msg:'Invalid Email' }})
      return false
    }
    return true
  }

  const onForgotPress = () => {
    const validForm = validateInputs();
    if (validForm) {
      const data = { username: state.email.toLowerCase()}
      setState({...state,error: false })

      dispatch(apiForgotQuery(data, props.userForgot, config.EndPoints.forgot, onForgotResult))
    // TODO: ADD API FORGOT
    // setTimeout(() => setLoading(false), 800)
  }
  }

    const onForgotResult = error => {
      if(error.status=== 400){
        setLoading(false)
        setState({ ...state, error: true, msg:error.response.data.message})
      }
      else if (error.status !== 200) {
        setLoading(false)
        setState({  ...state, error: true})
      } else {
        setLoading(false)
        setState({ ...state, success: true, msg:error.data.message})
      }
      console.log('err__', error)
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

        {!loading ? (state.success?(
            <div className={'onboard_success'}>
            <h3>AWESOME!</h3><p className={'onboard_success-info'}>{state.msg} </p>
            <Button onPress={onLoginPress} title='LOGIN' /> </div>):(
          <div className={'login__form'}>
            <Label> Enter your registered email and we will send out instructions on resetting access</Label>
            <Input label='Email address' onChange={onEmailChange} fieldName={'email'} value={state.email} error={!state.valid.email}/>
            {state.valid && ( <p className='error'>{state.valid.msg}</p> )}
            {state.error && (<p className='error'>{state.msg}</p>)}
            <Button onPress={onForgotPress} title='FORGOT' primary />            
            <div className='onboard__account'>
                  <Button onPress={onLoginPress} title='LOGIN' outline />
            </div>
          </div>)
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
