import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollContainer } from './styles'

class ScrollComponent extends PureComponent {
  static propTypes = {
    navbar: PropTypes.bool,
    color: PropTypes.string,
    padTop: PropTypes.bool
  }

  static defaultProps = {
    navbar: true,
    color: 'blue',
    padTop: true
  }

  render () {
    return (
      <ScrollContainer
        color={this.props.color}
        navbar={this.props.navbar}
        padTop={this.props.padTop}>
        {this.props.children}
      </ScrollContainer>
    )
  }
}

export default ScrollComponent
