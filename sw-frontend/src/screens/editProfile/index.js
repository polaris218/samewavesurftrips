import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import DatePicker from 'react-datepicker'

import { userActions, mapDispatchToProps } from 'api/actions'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'

import { General as config, Routes, Types } from 'config'
import { Tools } from 'utils'

import {
  ScrollContainer,
  Button,
  Container,
  Input,
  Card,
  Heading,
  Header,
  Preloader,
  Select
} from 'components'
import {
  Center,
  Label,
  Stack,
  Profile,
  ContentContainer,
  Images,
  InputFile,
  Details,
  Sub,
  DateInput,
  ImgCenter
} from './styles'

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
    interests: props.user.interests || [ '' ],
    surfing_since: props.user.surfing_since || '',
    optIn: props.user.optIn,
    invalid: [],
    avatar: props.user.avatar,
    coverImg: props.user.coverImg,
    avatarLoading: false,
    coverLoading: false
  })
  const [ avatar, setAvatar ] = useState(
    props.user.avatar ? config.EndPoints.digitalOcean + props.user.avatar : ''
  )
  const [ coverImg, setCoverImg ] = useState(
    props.user.coverImg
      ? config.EndPoints.digitalOcean + props.user.coverImg
      : ''
  )
  let mounted = true

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

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
      cover_image: state.coverImg,
      interests: state.interests,
      gender: state.gender,
      surf_level: state.surf_level,
      surf_modality: state.surf_modality,
      stance: state.stance,
      surfing_since: state.surfing_since
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
    if (error.status !== 200) {
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

  const onInterestsChange = (value, name) => {
    const interests = value.split(',')
    setState({
      ...state,
      interests
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
      if (type === 'avatar') {
        setState({ ...state, avatarLoading: true })
        setAvatar(dataURL)
      } else {
        setState({ ...state, coverLoading: true })
        setCoverImg(dataURL)
      }
    }
    reader.readAsDataURL(input.files[0])

    const blob = input.files[0]
    const data = new FormData()
    data.append('avatar', blob, blob.name)
    uploadImage(data, type)
  }

  const uploadImage = (data, type) => {
    dispatch(
      apiQuery(data, props.userImageUpload, config.EndPoints.avatar, res => {
        console.log(res)
        if (res.status === 200) {
          mounted && setState({ ...state, [type]: res.data })
        }
      }),
      'POST',
      {},
      false // ProcessData
    )
  }

  const onSelectChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleDateChange = (date, field) => {
    setState({
      ...state,
      [field]: date
    })
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
            <Center>
              <Container>
                <div className='profile__container'>
                  <Card>
                    <Stack>
                      <Images>
                        <form onSubmit={e => onImageUpload()}>
                          <Label>PROFILE PICTURE</Label>
                          <Sub>for best results use 512x512px</Sub>
                          <InputFile>
                            <button className='btn'>Upload avatar</button>
                            <input
                              type='file'
                              accept='image/*'
                              onChange={e => onImageChange(e, 'avatar')}
                            />
                          </InputFile>
                          <div className='profile__avatar'>
                            {state.avatarLoading ? (
                              <ImgCenter>
                                <Preloader />
                              </ImgCenter>
                            ) : (
                              <img
                                src={avatar}
                                width='200'
                                height='200'
                                alt='avatar'
                              />
                            )}
                          </div>

                          <Label>COVER PICTURE</Label>
                          <Sub>for best results use 1200x600px</Sub>
                          <InputFile>
                            <button className='btn'>Upload cover</button>
                            <input
                              type='file'
                              accept='image/*'
                              onChange={e => onImageChange(e, 'coverImg')}
                            />
                          </InputFile>
                          <div className='profile__cover'>
                            {state.coverLoading ? (
                              <ImgCenter>
                                <Preloader />
                              </ImgCenter>
                            ) : (
                              <img
                                src={coverImg}
                                width='200'
                                height='auto'
                                alt='cover'
                              />
                            )}
                          </div>
                        </form>
                      </Images>
                      <Details>
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
                          value={state.location}
                          fieldName={'location'}
                          error={checkValidField('location')}
                        />
                        <Select
                          items={Types.gender}
                          fieldName={'gender'}
                          placeholder={'Gender'}
                          error={checkValidField('gender')}
                          value={state.gender}
                          onChange={onSelectChange}
                        />
                        <Label>Bio</Label>
                        <Input
                          label='Bio'
                          onChange={onInputChange}
                          value={state.bio}
                          fieldName={'bio'}
                          error={checkValidField('bio')}
                          multiline={true}
                          rows={5}
                        />
                        <Label>Interests</Label>
                        <Sub>Seperate each interest with a comma</Sub>
                        <Input
                          label='Interests'
                          onChange={onInterestsChange}
                          value={state.interests}
                          fieldName={'interests'}
                          error={checkValidField('interests')}
                        />
                        <Label>Surf Style</Label>
                        <Select
                          items={Types.modality}
                          fieldName={'surf_modality'}
                          placeholder={'Surf Modality'}
                          error={checkValidField('surf_modality')}
                          value={state.surf_modality}
                          onChange={onInputChange}
                        />

                        <Select
                          items={Types.surfLevel}
                          fieldName={'surf_level'}
                          placeholder={'Surf Level'}
                          error={checkValidField('surf_level')}
                          value={state.surf_level}
                          onChange={onInputChange}
                        />
                        <Select
                          items={Types.stance}
                          fieldName={'stance'}
                          placeholder={'Stance'}
                          error={checkValidField('stance')}
                          value={state.stance}
                          onChange={onInputChange}
                        />
                        <Label>Surfing Since</Label>
                        <DateInput>
                          <DatePicker
                            selected={new Date(state.surfing_since)}
                            onChange={date =>
                              handleDateChange(date, 'surfing_since')}
                          />
                        </DateInput>
                      </Details>
                    </Stack>
                  </Card>
                  {!loading ? (
                    <div className={'profile__button'}>
                      <Button onPress={onEditPress} title='UPDATE PROFILE' />
                    </div>
                  ) : (
                    <div className={'profile__loader'}>
                      <Preloader />
                    </div>
                  )}
                </div>
              </Container>
            </Center>
          ) : (
            <Spring
              from={{
                opacity: 0,
                transform: 'translate3d(0,120px,0) scale(0.9)'
              }}
              to={{
                opacity: 1,
                transform: 'translate3d(0,40px,0) scale(1)'
              }}>
              {props => (
                <div className={'profile__success'} style={props}>
                  <div className={'profile__success-content'}>
                    <Card>
                      <div className={'profile__icon'}>
                        {Tools.renderIcon('face_happy')}
                      </div>
                      <Heading title='GREAT!' />
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
