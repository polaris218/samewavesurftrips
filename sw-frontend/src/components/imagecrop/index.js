/* eslint-disable react/style-prop-object */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'components'
import { Colors } from 'config'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { ButtonContainer, Modal, Content, Title } from './style'

const CropComponent = props => {
  const [ image, setImage ] = useState()
  const [ state, setState ] = useState({
    crop: {
      aspect: 1,
      x: 10,
      y: 10,
      width: 100,
      height: 100
    }
  })
  const onConfirmPress = () => {
    // getCroppedImg(state.image,state.crop,'upload')
    const croppedImg = getCroppedImg(
      image.image,
      state.crop,
      'upload'
    ).then(img => {
      props.onYesPress(img)
      setState({ crop: { aspect: 1 / 1 } })
    })
  }
  const onCancelPress = () => {
    props.onNoPress()
  }
  const onImageLoaded = image => {
    // console.log('onCropComplete', image)
    // setState({image:image})
    // state.image=image;
    // setState({image})
    // Image=image
    setImage({ image })
  }

  const onCropComplete = crop => {
    console.log('changed to ', crop)
  }

  const onCropChange = crop => {
    setState({ crop })
  }

  function getCroppedImg (image, crop, fileName) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName
        resolve(blob)
      }, 'image/jpeg')
    })
  }

  return (
    <Modal visible={props.visible}>
      <Content visible={props.visible}>
        <Card style='width:20vh !important'>
          <Title>Crop Image</Title>
          <ReactCrop
            src={props.src || ''}
            crop={state.crop}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
          {/* <Sub>{props.sub}</Sub> */}
          <ButtonContainer visible={props.visible}>
            <Button
              color={Colors.GREY_LIGHT}
              hoverColor={Colors.GREY_BASE}
              onPress={onCancelPress}
              title={props.buttonNo}
            />
            <Button onPress={onConfirmPress} title={props.buttonYes} />
          </ButtonContainer>
        </Card>
      </Content>
    </Modal>
  )
}

CropComponent.propTypes = {
  visible: PropTypes.bool
}

CropComponent.defaultProps = {
  visible: true,
  title: 'Join the ShameWave',
  sub: 'are you sure you want to pal?',
  buttonNo: 'CANCEL',
  buttonYes: 'CONFIRM',
  onNoPress: () => {},
  onYesPress: () => {}
  // onConPress: () => { }
}

export default CropComponent
