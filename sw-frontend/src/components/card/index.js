import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from './styles';

class CardComponent extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        marginBottom: PropTypes.number
    }

    static defaultProps = {
        type: 'default',
        marginBottom: 0
    }

    render() {
        return (
        <Card marginBottom={this.props.marginBottom}>
            {this.props.children}
        </Card>
        );
    }
}

export default CardComponent;
