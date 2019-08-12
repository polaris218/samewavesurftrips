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
  Places,
  CropModal,
  ButtonGroup
} from 'components'
import {
  ButtonFooter,
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
  ImgCenter,
  ButtonGroupRow
} from './styles'

const EditProfileScreen = props => {
  const [ loading, setLoading ] = useState(false)
  const [ editSuccess, setEditSuccess ] = useState(false)
  const [ CropmodalVisible, setCropModalVisible ] = useState(false)
  const [ state, setState ] = useState({
    firstName: props.user.firstName || '',
    lastName: props.user.lastName || '',
    email: props.user.email || '',
    bio: props.user.bio || '',
    gender: props.user.gender || '',
    location: props.user.location || { name: '' },
    phone: props.user.phone || '',
    surf_level: props.user.surf_level || '',
    surf_modality: props.user.surf_modality || '',
    stance: props.user.stance || '',
    interests: props.user.interests || [ '' ],
    surfing_since: props.user.surfing_since || new Date(),
    optIn: props.user.optIn,
    invalid: [],
    avatar: props.user.avatar,
    coverImg: props.user.coverImg,
    avatarLoading: false,
    coverLoading: false,
    src: null,
    blob: null,
    type: null
  })
  const [ avatar, setAvatar ] = useState('')
  const [ coverImg, setCoverImg ] = useState(
    props.user.coverImg
      ? config.EndPoints.digitalOcean + props.user.coverImg
      : ''
  )
  const [genderOptions, setGenders] = useState([])
  const [genderSelected, setGenderSelected] = useState(0)
  const [modality, setModality] = useState([])
  const [modalitySelected, setModalitySelected] = useState(0)
  const [stance, setStance] = useState([])
  const [stanceSelected, setStanceSelected] = useState(0)
  const [surfLevel, setSurfLevel] = useState([])
  const [surfLevelSelected, setSurfLevelSelected] = useState(0)

  let mounted = true

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    setAvatar(userAvatar())
    // Gender
    const tempGenders = []
    Types.gender.forEach((gender, i) => {
      tempGenders.push({
        title: gender,
      })
      if(props.user.gender === gender)  setGenderSelected(i)
      console.log(props.user.gender, gender, i)
    })
    setGenders(tempGenders)

    //Modailty
    const tempMods = []
    Types.modality.forEach((mod, i) => {
      tempMods.push({
        title: mod,
      })
      if(props.user.surf_modality === mod)  setModalitySelected(i)
    })
    setModality(tempMods)
    //Stance
    const stanceMods = []
    Types.stance.forEach((st, i) => {
      stanceMods.push({
        title: st,
      })
      if(props.user.stance === st)  setStanceSelected(i)
    })
    setStance(stanceMods)
    //SurfLevel
    const levelMods = []
    Types.surfLevel.forEach((level, i) => {
      levelMods.push({
        title: level,
      })
      if(props.user.surf_level === level)  setSurfLevelSelected(i)
    })
    setSurfLevel(levelMods)
  }, [])


  const onGenderPress = (index) => {
    setGenderSelected(index)
    setState({
      ...state,
      gender: genderOptions[index].title
    })
  }

  const onModalityPress = (index) => {
    setModalitySelected(index)
    setState({
      ...state,
      surf_modality: modality[index].title
    })
  }

  const onStancePress = (index) => {
    setStanceSelected(index)
    setState({
      ...state,
      stance: stance[index].title
    })
  }

  const onSurfLevelPress = (index) => {
    setSurfLevelSelected(index)
    setState({
      ...state,
      surf_level: surfLevel[index].title
    })
  }

  const onEditPress = () => {
    setLoading(true)
    const data = {
      authtoken: props.user.accessToken,
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      phone: state.phone,
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
      setState({ ...state, error })
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
      setState({ ...state, invalid: errors })
      return false
    } else {
      return true
    }
  }

  const checkValidField = name => {
    return state.invalid.indexOf(name) > -1
  }

  const onInputChange = (value, name) => {
    setState({ ...state, [name]: value })
  }

  const onSetLocation = (location, field) => {
    console.log('Location ', location)
    setState({ ...state, location })
  }

  const onInterestsChange = (value, name) => {
    const interests = value.split(',')
    setState({ ...state, interests })
  }

  const onCompleteButton = () => {
    props.history.push('/' + Routes.PROFILE)
  }

  const onImageUpload = () => {}
  
  const onImageChange = (e, type) => {
    console.log('this is no')
    state.type = type
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.onload = function () {
        state.src = reader.result
        setCropModalVisible(true)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const uploadImage = (data, type) => {
    dispatch(
      apiQuery(
        data,
        props.userImageUpload,
        type === 'avatar' ? config.EndPoints.avatar : config.EndPoints.cover,
        res => {
          if (res.status === 200) {
            console.log('image uploaded ', res.data, type)
            if (type === 'avatar') {
              mounted &&
                setState({
                  ...state,
                  avatar: res.data,
                  blob: null,
                  src: null,
                  type: null
                })
            }
            if (type === 'coverImg') {
              mounted &&
                setState({
                  ...state,
                  coverImg: res.data,
                  blob: null,
                  src: null,
                  type: null
                })
            }
          }
        }
      ),
      'POST',
      {},
      false // ProcessData
    )
  }


  const handleDateChange = (date, field) => {
    setState({
      ...state,
      [field]: date
    })
  }

  const userAvatar = () => {
    let image = ''
    if (props.user.avatar) {
      if (props.user.avatar && props.user.avatar.includes('https://'))
        return props.user.avatar
      image = config.EndPoints.digitalOcean + props.user.avatar
    }
    return image
  }

  return (
    <Profile>
      <ScrollContainer navbar={false}>
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
                  <Card slim>
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
                              state.avatar && (
                                <img
                                  src={avatar}
                                  width='200'
                                  height='200'
                                  alt='avatar'
                                  onClick={(e) => onImageChange(e, 'coverImg')}
                                />
                              )
                            )}
                          </div>

                          <Label>COVER PICTURE</Label>
                          <Sub>for best results use 1200x600px</Sub>
                          <InputFile>
                            <button className='btn'>Upload cover</button>
                            <input
                              type='file'
                              accept='image/*'
                              onClick={(e) => onImageChange(e, 'coverImg')}
                            />
                          </InputFile>
                          <div className='profile__cover'>
                            {state.coverLoading ? (
                              <ImgCenter>
                                <Preloader />
                              </ImgCenter>
                            ) : (
                              state.coverImg && (
                                <img
                                  src={coverImg}
                                  width='200'
                                  height='auto'
                                  alt='cover'
                                />
                              )
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
                          label='Phone Number'
                          onChange={onInputChange}
                          value={state.phone}
                          fieldName={'phone'}
                          type={'tel'}
                          error={checkValidField('phone')}
                        />
                        <Label>Your Location</Label>
                        <Places
                          label='Your Location'
                          onChange={location =>
                            onSetLocation(location, 'location')}
                          value={state.location.name}
                          error={checkValidField('location')}
                        />
                        <Label>Gender</Label>
                        <ButtonGroupRow>
                          <ButtonGroup 
                            action={onGenderPress}
                            items={genderOptions}
                            selected={genderSelected}
                          />
                        </ButtonGroupRow>
                      
                        <Label>WHAT IS YOUR MAIN SURF MODALITY?</Label>
                        <ButtonGroupRow>
                          <ButtonGroup 
                            action={onModalityPress}
                            items={modality}
                            selected={modalitySelected}
                          />
                        </ButtonGroupRow>
                        <Label>WHAT IS YOUR MAIN SURFING LEVEL?</Label>
                        <ButtonGroupRow>
                          <ButtonGroup 
                            action={onSurfLevelPress}
                            items={surfLevel}
                            selected={surfLevelSelected}
                          />
                        </ButtonGroupRow>
                        <Label>WHAT IS YOUR STANCE?</Label>
                        <ButtonGroupRow>
                          <ButtonGroup 
                            action={onStancePress}
                            items={stance}
                            selected={stanceSelected}
                          />
                        </ButtonGroupRow>
                        <Label>Surfing Since</Label>
                        <DateInput>
                          <DatePicker
                            selected={new Date(state.surfing_since)}
                            onChange={date =>
                              handleDateChange(date, 'surfing_since')}
                          />
                        </DateInput>

                        <Label>Interests</Label>
                        <Sub>* SEPERATE EACH INTEREST WITH A COMMA ,</Sub>
                        <Input
                          label='Interests'
                          onChange={onInterestsChange}
                          value={state.interests}
                          fieldName={'interests'}
                          error={checkValidField('interests')}
                        />

                        <Label>Bio</Label>
                        <Input
                          label='Add something interesting about yourself'
                          onChange={onInputChange}
                          value={state.bio}
                          fieldName={'bio'}
                          error={checkValidField('bio')}
                          multiline={true}
                          rows={5}
                        />
                      </Details>
                    </Stack>
                  </Card>
                </div>
              </Container>
            </Center>
          ) : (
            <Spring
              from={{
                opacity: 0,
                transform: 'translate3d(0,120px,0) scale(0.9)'
              }}
              to={{ opacity: 1, transform: 'translate3d(0,40px,0) scale(1)' }}>
              {props => (
                <div className={'profile__success'} style={props}>
                  <div className={'profile__success-content'}>
                    <Card>
                      <div className={'profile__icon'}>
                        {Tools.renderIcon('face_happy')}{' '}
                      </div>
                      <Heading title='GREAT!' />
                      <div className='profile__complete'>
                        Your profile has been updated.{' '}
                      </div>
                      <div className={'profile__button_complete'}>
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
      {!editSuccess &&
      <ButtonFooter>
        {!loading ? (
          <>
            <Button onPress={onEditPress} title='UPDATE PROFILE' />
            </>
        ) : (
          <Preloader />
        )}
      </ButtonFooter>
      }
      <CropModal
        visible={CropmodalVisible}
        title={'CROP'}
        src={state.src}
        buttonNo='CANCEL'
        buttonYes='Confirm'
        onNoPress={() => {
          setCropModalVisible(false)
        }}
        onYesPress={blob => {
          state.blob = blob
          const reader = new FileReader()
          reader.onload = function () {
            let src = reader.result
            // console.log(src)
            if (state.type === 'avatar') {
              setState({ ...state, avatarLoading: true })
              setAvatar(src)
            } else {
              setState({ ...state, coverLoading: true })
              setCoverImg(src)
            }
            const data2 = new FormData()
            data2.append(
              state.type === 'avatar' ? 'avatar' : 'cover',
              blob,
              blob.name
            )
            uploadImage(data2, state.type)
            setCropModalVisible(false)
          }
          reader.readAsDataURL(blob)
        }}
      />
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
