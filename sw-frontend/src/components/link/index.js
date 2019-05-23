import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from './styles';
import { Colors } from 'config';

class LinkComponent extends PureComponent {

    static propTypes = {
        href: PropTypes.string,
        target: PropTypes.string,
        rel: PropTypes.string,
        color: PropTypes.string,
        hoverColor: PropTypes.string
    }

    static defaultProps = {
        href: "#",
        target: "_blank",
        rel: "noopener noreferrer",
        color: Colors.GREEN_BASE,
        hoverColor: Colors.GREEN_LIGHT,
        onClick: null
    }

    onClick = (ev) => {
        if(this.props.onClick) {
            ev.preventDefault();
            this.props.onClick();
        }
        return false;
    }

    render() {
        return (
        <Link 
            href={this.props.href}
            target={this.props.target}
            rel={this.props.rel}
            color={this.props.color}
            hoverColor={this.props.hoverColor}
            onClick={this.onClick}
        >
            {this.props.children}
        </Link>
    );
  }
}

export default LinkComponent;
