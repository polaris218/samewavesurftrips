import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import surfImg from 'assets/images/background_van.jpg'
import { BackgroundImg } from './styles'

class BackgroundImageComponent extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    opacity: PropTypes.number,
    blur: PropTypes.number
  }

  static defaultProps = {
    image: surfImg,
    opacity: 1,
    blur: 6
  }

  render () {
    return (
      <BackgroundImg
        opacity={this.props.opacity}
        image={this.props.image}
        blur={this.props.blur}
      />
    )
  }
}

export default BackgroundImageComponent
