import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

class ContainerComponent extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
    }

    static defaultProps = {
        type: 'default'
    }

    render() {
        return (
        <Container>
            {this.props.children}
        </Container>
        );
    }
}

export default ContainerComponent;
