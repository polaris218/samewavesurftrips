import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Colors } from 'config';
import { BackButton } from './styles';

class BackComponent extends PureComponent {

  static propTypes = {
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
      color: Colors.BLUE_BASE,
      hoverColor: Colors.GREEN_LIGHT,
      onPress: () => {}
  }

  onButtonPress = () => {
    this.props.history.goBack();
    this.props.onPress();
  }
  
  render() {
    return (
      <BackButton 
        onClick={this.onButtonPress}
        color={this.props.color}
        hoverColor={this.props.hoverColor}
      > 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill={this.props.color}
                d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"
            />
        </svg>
      </BackButton>
    );
  }
}

export default withRouter(BackComponent);
