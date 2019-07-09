import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiForgotQuery } from 'api/thunks/general'
import { General as config } from 'config'

import { BackgroundImage, Button, Container, Logo, Input, Preloader} from 'components'
import { Routes } from 'config';
import { Forgot, Label } from './styles';

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
 
  const onLoginPress = () => {
    props.history.push('/' + Routes.LOGIN)
  }
  const validateInputs = () => {
    if (state.password !== state.passwordConfirm || state.password === '') {
      setState({...state,error:true, valid: { ...state.valid, password: false},msg:'Incorrect Password'})
      return false
    }
    return true
  }

  const onResetPress = () => {
    console.log("aa=",props.location.search.split('?token=')[1]);
    state.token=props.location.search.split('?token=')[1];
 
      const validForm = validateInputs();
      if (validForm) {
        const data = { password: state.password, token: state.token }
        setState({ ...state, error: false })
        dispatch(apiForgotQuery(data, props.userReset, config.EndPoints.reset, onResetResult) )
      }
  }

    const onResetResult = error => {
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
        {!loading ?  (state.success?(
            <div className={'onboard_success'}>
            <h3>AWESOME!</h3><p className={'onboard_success-info'}>{state.msg} </p>
            <Button onPress={onLoginPress} title='LOGIN' />
          </div>):(
          <div className={'login__form'}>
            <Label>Reset Password  </Label>           
            <Input label='Password' type='password' onChange={onInputChange} fieldName={'password'} error={!state.valid.password}/>
            <Input label='Confirm Password' type='password' value={state.passwordConfirm} onChange={onInputChange} fieldName={'passwordConfirm'} error={!state.valid.password} />
            {state.error && (<p className='error'>{state.msg}</p>)}
            <Button onPress={onResetPress} title='Reset' primary />
            {state.error && ( <p className='onboard__error'>{state.errorMsg}</p>  )}
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
