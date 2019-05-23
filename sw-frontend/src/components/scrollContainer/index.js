import React from 'react'
import PropTypes from 'prop-types'
import { ScrollContainer } from './styles'

const ScrollComponent = props => {
  return (
    <ScrollContainer
      color={props.color}
      navbar={props.navbar}
      padTop={props.padTop}
      height={props.height}>
      {props.children}
    </ScrollContainer>
  )
}

ScrollComponent.propTypes = {
  navbar: PropTypes.bool,
  color: PropTypes.string,
  padTop: PropTypes.bool,
  height: PropTypes.string
}

ScrollComponent.defaultProps = {
  navbar: true,
  color: 'blue',
  padTop: true
}
export default ScrollComponent
