import React from 'react'
import { Progress, Container } from './styles'
import { Colors } from 'config'

const PreloaderComponent = props => {
  return (
    <Container color={props.color}>
      <Progress />
    </Container>
  )
}

PreloaderComponent.propTypes = {}

PreloaderComponent.defaultProps = {
  color: Colors.BLUE_BASE
}

export default PreloaderComponent
