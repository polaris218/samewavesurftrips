import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { P } from 'components'
import { Colors } from 'config'
import { MenuItem, MenuItemContainer } from './styles'

class MenuItemComponent extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    title: PropTypes.string,
    primary: PropTypes.bool,
    onPress: PropTypes.func
  }

  static defaultProps = {
    color: `#454545`,
    hoverColor: `hsl(180, 0%, 45%)`,
    title: 'title',
    primary: false,
    outline: false,
    icon: null,
    onPress: () => {}
  }

  onButtonPress = () => {
    this.props.onPress()
  }

  render () {
    return (
      <MenuItemContainer>
        <MenuItem
          onClick={this.onButtonPress}
          primary={this.props.primary}
          color={this.props.color}
          hoverColor={this.props.hoverColor}
          outline={this.props.outline}>
          {this.props.icon && (
            <div className='menuitem__icon'>{this.props.icon}</div>
          )}
          <P className='menuitem__title'>{this.props.title}</P>
        </MenuItem>
      </MenuItemContainer>
    )
  }
}

export default MenuItemComponent
