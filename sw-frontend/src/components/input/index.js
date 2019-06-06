import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from './styles'

const InputComponent = props => {
  const [ value, setValue ] = useState(props.value)

  const handleChange = name => event => {
    setValue(event.target.value)
    if (props.onChange) props.onChange(event.target.value, name)
  }

  return (
    <TextField
      id={props.id || props.label}
      label={props.label}
      value={value}
      placeholder={props.label}
      onChange={handleChange(props.fieldName)}
      margin='none'
      error={props.error}
      type={props.type}
      multiline={props.multiline}
      rows={props.rows}
      autoFocus={props.focus}
    />
  )
}

InputComponent.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  type: PropTypes.string,
  fieldName: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  focus: PropTypes.bool
}

InputComponent.defaultProps = {
  id: '',
  label: 'title',
  value: '',
  onChange: null,
  error: false,
  type: 'text',
  fieldName: 'value',
  multiline: false,
  rows: 1,
  focus: false
}

export default InputComponent
