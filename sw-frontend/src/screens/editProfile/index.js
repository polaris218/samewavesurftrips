import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import axios from 'axios'

import { userActions, mapDispatchToProps } from 'api/actions'
import store, { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes } from 'config'
import { Tools } from 'utils'

import {
  ScrollContainer,
  Button,
  Container,
  Input,
  Card,
  Heading,
  Header,
  Preloader
} from 'components'
import { Label, Profile, ContentContainer, InputFile } from './styles'

const EditProfileScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ editSuccess, setEditSuccess ] = useState(false)
  const [ state, setState ] = useState({
    firstName: props.user.firstName || '',
    lastName: props.user.lastName || '',
    email: props.user.email || '',
    bio: props.user.bio || '',
    gender: props.user.gender || '',
    location: props.user.location || '',
    phone: props.user.phone || '',
    surf_level: props.user.surf_level || '',
    surf_modality: props.user.surf_modality || '',
    stance: props.user.stance || '',
    interests: props.user.interests || '',
    surfing_since: props.user.surfing_since || '',
    optIn: props.user.optIn,
    invalid: [],
    avatar: props.user.avatar,
    coverImg: props.user.coverImg
  })
  const [ avatar, setAvatar ] = useState(
    props.user.avatar ? config.EndPoints.digitalOcean + props.user.avatar : ''
  )
  const [ coverImg, setCoverImg ] = useState(
    props.user.coverImg
      ? config.EndPoints.digitalOcean + props.user.coverImg
      : ''
  )

  const onEditPress = () => {
    setLoading(true)
    const data = {
      authtoken: props.user.accessToken,
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      location: state.location,
      bio: state.bio,
      avatar: state.avatar,
      cover_image: state.coverImg
    }

    //Validate from .....
    const valid = validateForm(data)
    console.log(data, state, valid)
    if (valid) {
      // Send
      dispatch(
        apiQuery(
          data,
          props.userEdit,
          config.EndPoints.user,
          onEditResult,
          'put'
        )
      )
    }
  }

  const onEditResult = error => {
    if (error) {
      setLoading(false)
      setState({
        ...state,
        error
      })
    } else {
      setLoading(false)
      setEditSuccess(true)
    }
  }

  const validateForm = data => {
    const errors = []
    if (data.title === '') errors.push('title')

    if (errors.length > 0) {
      setLoading(false)
      setState({
        ...state,
        invalid: errors
      })
      return false
    } else {
      return true
    }
  }

  const checkValidField = name => {
    return state.invalid.indexOf(name) > -1
  }

  const onInputChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onCompleteButton = () => {
    props.history.push('/' + Routes.PROFILE)
  }

  const onImageUpload = () => {}

  const onImageChange = (e, type) => {
    const input = e.target
    const reader = new FileReader()
    reader.onload = function () {
      const dataURL = reader.result
      if (type === 'avatar') setAvatar(dataURL)
      else setCoverImg(dataURL)
    }
    reader.readAsDataURL(input.files[0])

    const blob = input.files[0]
    const data = new FormData()
    data.append('avatar', blob, blob.name)
    uploadImage(data, type)
  }

  const uploadImage = async (data, type) => {
    const bearerToken = 'Bearer ' + store.getState().user.accessToken
    // const url =
    //   type === 'avatar' ? config.EndPoints.avatar : config.EndPoints.cover
    const response = await axios({
      method: 'POST',
      url: config.EndPoints.avatar,
      data: data,
      processData: false,
      headers: { Authorization: bearerToken },
      validateStatus: status => {
        return true
      },
      timeout: config.APITimeout
    })
    if (response.status === 200) {
      setState({ ...state, [type]: response.data })
    }
  }

  return (
    <Profile>
      <ScrollContainer color={'orange'} navbar={false}>
        <Header
          nav={false}
          backButton
          homeButton={false}
          title='Edit your Profile'
        />
        <ContentContainer>
          {!editSuccess ? (
            <Container>
              <div className='profile__container'>
                <Card marginBottom={80}>
                  <Label>User Details</Label>
                  <Input
                    label='First Name'
                    onChange={onInputChange}
                    value={state.firstName}
                    fieldName={'firstName'}
                    error={checkValidField('firstName')}
                  />
                  <Input
                    label='Last Name'
                    onChange={onInputChange}
                    value={state.lastName}
                    fieldName={'lastName'}
                    error={checkValidField('lastName')}
                  />

                  <Input
                    label='Email'
                    onChange={onInputChange}
                    value={state.email}
                    fieldName={'email'}
                    error={checkValidField('email')}
                  />

                  <Input
                    label='Location'
                    onChange={onInputChange}
                    value={state.location.name}
                    fieldName={'location'}
                    error={checkValidField('location')}
                  />

                  <Input
                    label='Bio'
                    onChange={onInputChange}
                    value={state.bio}
                    fieldName={'bio'}
                    error={checkValidField('bio')}
                    multiline={true}
                    rows={5}
                  />

                  <form onSubmit={e => onImageUpload()}>
                    <Label>UPLOAD YOUR PROFILE PICTURE</Label>
                    <InputFile
                      type='file'
                      accept='image/*'
                      onChange={e => onImageChange(e, 'avatar')}
                    />
                    <img src={avatar} width='200' height='200' alt='avatar' />

                    <Label>UPLOAD YOUR COVER PICTURE</Label>
                    <InputFile
                      type='file'
                      accept='image/*'
                      onChange={e => onImageChange(e, 'coverImg')}
                    />
                    <img src={coverImg} width='400' height='200' alt='cover' />
                  </form>

                  {!loading ? (
                    <div className={'profile__button'}>
                      <Button onPress={onEditPress} title='UPDATE' />
                    </div>
                  ) : (
                    <div className={'profile__loader'}>
                      <Preloader />
                    </div>
                  )}
                </Card>
              </div>
            </Container>
          ) : (
            <Spring
              from={{
                opacity: 0,
                transform: 'translate3d(0,20px,0) scale(0.4)'
              }}
              to={{
                opacity: 1,
                transform: 'translate3d(0,0,0) scale(1)'
              }}>
              {props => (
                <div className={'profile__success'} style={props}>
                  <div className={'profile__success-content'}>
                    <Card>
                      <div className={'profile__icon'}>
                        {Tools.renderIcon('groovy')}
                      </div>
                      <Heading title='AWESOME!' />
                      <div className='profile__complete'>
                        Your profile has been updated.
                      </div>
                      <div className={'profile__button'}>
                        <Button
                          onPress={onCompleteButton}
                          title='VIEW MY PROFILE'
                        />
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </Spring>
          )}
        </ContentContainer>
      </ScrollContainer>
    </Profile>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(EditProfileScreen))
