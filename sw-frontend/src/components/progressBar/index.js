import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar, Bar } from './styles'

const ProgressBarComponent = props => {
  return (
    <ProgressBar>
      <Bar total={props.total} step={props.current} />
    </ProgressBar>
  )
}

ProgressBarComponent.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number
}

ProgressBarComponent.defaultProps = {
  total: 4,
  current: 1
}
export default ProgressBarComponent
