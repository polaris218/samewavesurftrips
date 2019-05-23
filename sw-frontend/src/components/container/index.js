import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './styles'

const ContainerComponent = props => {
  return <Container height={props.height}>{props.children}</Container>
}

ContainerComponent.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string
}

ContainerComponent.defaultProps = {
  type: 'default',
  height: null
}

export default ContainerComponent
