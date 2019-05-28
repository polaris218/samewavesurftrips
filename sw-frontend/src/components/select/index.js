import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SelectMenu, Item } from './styles'
import MenuItem from '@material-ui/core/MenuItem'

class SelectComponent extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
    fieldName: PropTypes.string
  }

  static defaultProps = {
    items: [],
    value: '',
    onChange: null,
    error: false,
    placeholder: 'Select',
    fieldName: null
  }

  state = {
    value: this.props.value
  }

  handleChange = event => {
    console.log('select?', event.target.value, event.target.name)
    this.setState({
      value: event.target.value
    })
    if (this.props.onChange)
      this.props.onChange(event.target.value, event.target.name)
  }

  render () {
    return (
      <SelectMenu
        value={this.state.value}
        onChange={this.handleChange}
        inputProps={{
          name: this.props.fieldName
        }}
        displayEmpty
        error={this.props.error}>
        <MenuItem value=''>
          <em>{this.props.placeholder}</em>
        </MenuItem>
        {this.props.items.map(item => {
          return (
            <Item key={item} value={item}>
              {item}
            </Item>
          )
        })}
      </SelectMenu>
    )
  }
}

export default SelectComponent
