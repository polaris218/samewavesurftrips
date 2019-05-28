import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { P } from 'components'
import { Button, ButtonContainer } from './styles'

class ButtonComponent extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    title: PropTypes.string,
    primary: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    color: null,
    hoverColor: null,
    title: 'title',
    primary: false,
    outline: false,
    icon: null,
    onPress: () => {},
    disabled: false
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
          outline={this.props.outline}>
          {this.props.icon && (
            <img
              className='button__icon'
              src={this.props.icon}
              height={20}
              alt={this.props.title}
            />
          )}
          <P className='button__title'>{this.props.title}</P>
        </Button>
      </ButtonContainer>
    )
  }
}

export default ButtonComponent
