import React from 'react'
import PropTypes from 'prop-types'
import { Label, Digit, Stat } from './styles'

const StatComponent = props => {
  return (
    <Stat>
      <Digit>{props.stat}</Digit>
      <Label>{props.label}</Label>
    </Stat>
  )
}

StatComponent.propTypes = {
  stat: PropTypes.string,
  label: PropTypes.string
}

StatComponent.defaultProps = {
  stat: '',
  label: ''
}

export default StatComponent
