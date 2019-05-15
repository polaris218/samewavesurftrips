import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollContainer } from './styles';

class ScrollComponent extends PureComponent {
    static propTypes = {
        navbar: PropTypes.bool,
        color: PropTypes.string
      }
    
      static defaultProps = {
        navbar: true,
        color: 'blue',
      }

    render() {
        return (
            <ScrollContainer 
                color={this.props.color}
                navbar={this.props.navbar}>
                { this.props.children }
            </ScrollContainer>
        );
    }
}

export default ScrollComponent;
