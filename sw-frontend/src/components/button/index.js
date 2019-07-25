import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { P } from 'components'
import { Tools } from 'utils'
import { Button, ButtonContainer } from './styles'

class ButtonComponent extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    title: PropTypes.string,
    primary: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    iconSvg: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
  }

  static defaultProps = {
    color: null,
    hoverColor: null,
    title: 'title',
    primary: false,
    outline: false,
    outlineDark: false,
    icon: null,
    iconSvg: true,
    onPress: () => {},
    disabled: false,
    selected: false
  }

  onButtonPress = () => {
    this.props.onPress()
  }

  render () {
    return (
      <ButtonContainer>
        <Button
          disabled={this.props.disabled}
          onClick={this.onButtonPress}
          primary={this.props.primary}
          color={this.props.color}
          hoverColor={this.props.hoverColor}
          outlineDark={this.props.outlineDark}
          outline={this.props.outline}
          selected={this.props.selected}>
          {this.props.icon &&
            (!this.props.iconSvg ? (
              <img
                className='button__icon'
                src={this.props.icon}
                height={20}
                alt={this.props.title}
              />
            ) : (
              Tools.renderIcon(this.props.icon)
            ))}
          <P className='button__title'>{this.props.title}</P>
        </Button>
      </ButtonContainer>
    )
  }
}

export default ButtonComponent
