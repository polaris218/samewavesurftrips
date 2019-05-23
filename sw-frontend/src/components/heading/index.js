import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Heading } from './styles';

class HeadingComponent extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
    }

    static defaultProps = {

    }

    render() {
        return (
        <Heading>
            {this.props.title}
        </Heading>
        );
    }
}

export default HeadingComponent;
