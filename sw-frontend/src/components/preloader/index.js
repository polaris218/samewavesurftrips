import React from 'react'
import CircularProgress from './styles'
import { Colors } from 'config'

const PreloaderComponent = props => {
  return <CircularProgress color={props.color} />
}

PreloaderComponent.propTypes = {}

PreloaderComponent.defaultProps = {
  color: Colors.BLUE_BASE
}

export default PreloaderComponent
