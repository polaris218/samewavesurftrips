import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spacings, Colors } from 'config';
import { P } from './styles';

class ParaComponent extends PureComponent {
  
  static propTypes = {
    fontSize: PropTypes.string,
    color: PropTypes.string,
  }

  static defaultProps = {
    fontSize: Spacings.FONT.BODY,
    color: Colors.GREY_BASE
  }

  render() {
    return (
      <P
        style={{...this.props.style}}
        fontSize={this.props.fontSize}
        color={this.props.color}
      >
          {this.props.children}
      </P>
    );
  }
}

export default ParaComponent;
