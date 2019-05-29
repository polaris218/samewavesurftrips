import React from 'react'
import PropTypes from 'prop-types'
import { ScrollContainer } from './styles'

const ScrollComponent = props => {
  return (
    <ScrollContainer
      color={props.color}
      navbar={props.navbar}
      padTop={props.padTop}
      height={props.height}
      align={props.align}>
      {props.children}
    </ScrollContainer>
  )
}

ScrollComponent.propTypes = {
  navbar: PropTypes.bool,
  color: PropTypes.string,
  padTop: PropTypes.bool,
  height: PropTypes.string,
  center: PropTypes.bool
}

ScrollComponent.defaultProps = {
  navbar: true,
  color: 'blue',
  padTop: true,
  align: 'flex-start'
}
export default ScrollComponent
