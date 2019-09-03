import React from 'react'
import PropTypes from 'prop-types'
import { Container } from './styles'

const ContainerComponent = props => {
  return (
    <Container
      noPadd={props.noPadd}
      height={props.height}
      scroll={props.scroll}>
      {props.children}
    </Container>
  )
}

ContainerComponent.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
  noPadd: PropTypes.bool
}

ContainerComponent.defaultProps = {
  type: 'default',
  height: null,
  noPadd: false,
  scroll: false
}

export default ContainerComponent
