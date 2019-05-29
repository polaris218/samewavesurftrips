import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'components'
import { Colors } from 'config'
import { ButtonContainer, Modal, Content, Sub, Title } from './styles'

const ModalComponent = props => {
  const onConfirmPress = () => {
    props.onYesPress()
  }
  const onCancelPress = () => {
    props.onNoPress()
  }

  return (
    <Modal visible={props.visible}>
      <Content visible={props.visible}>
        <Card>
          <Title>{props.title}</Title>
          <Sub>{props.sub}</Sub>
          <ButtonContainer>
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

ModalComponent.propTypes = {
  visible: PropTypes.bool
}

ModalComponent.defaultProps = {
  visible: true,
  title: 'Join the ShameWave',
  sub: 'are you sure you want to pal?',
  buttonNo: 'CANCEL',
  buttonYes: 'CONFIRM',
  onNoPress: () => {},
  onYesPress: () => {}
}

export default ModalComponent
