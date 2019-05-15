import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'config';
import { Avatar } from './styles';

class AvatarComponent extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func,
    image: PropTypes.string,
  }

  static defaultProps = {
      image: null,
      onPress: () => {},
  }

  onButtonPress = () => {
    this.props.onPress();
  }
  
  render() {
    return (
      <Avatar 
        onClick={this.onButtonPress}
      > 
      {this.props.image ? (
          <img src={this.props.image} alt="surfer profile" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill={Colors.WHITE} d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"/>
        </svg>
      )}
      </Avatar>
    );
  }
}

export default AvatarComponent;
