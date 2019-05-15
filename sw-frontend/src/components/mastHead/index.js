import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MastHead, CoverImg } from './styles';

class MastHeadComponent extends PureComponent {

    static propTypes = {
        image: PropTypes.string,
    }
    
    static defaultProps = {
        image: null,
    }

    render() {
        return (
        <MastHead>
            {this.props.image && (
                <CoverImg image={this.props.image} />
            )}
            {this.props.children}
        </MastHead>
    );
  }
}

export default MastHeadComponent