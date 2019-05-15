import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Routes } from 'config';
import { Link, P } from 'components';
import { Footer } from './styles';

class FooterComponent extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    primary: PropTypes.bool,
    type: PropTypes.string
  }

  static defaultProps = {
      title: "title",
      primary: false,
      type: 'signup'
  }

  onLinkPress = (link) => {
    let route;

    switch(link) {
      case 'terms':
        route = Routes.TERMS
      break;
      case 'data':
        route = Routes.PRIVACY
      break;
      case 'privacy':
        route = Routes.PRIVACY
      break;
      default:
        route = Routes.LOGIN
      break;
    }

    this.props.history.push('/' + route);
  }

  render() {
    return (
      <Footer>
          {this.props.type === 'signup' && (
            <p>
                By signing up you agree to our<br/>
                  <Link onClick={this.onLinkPress.bind(this, 'terms')}>Terms</Link>, &nbsp; 
                  <Link onClick={this.onLinkPress.bind(this, 'data')}>Data Policy</Link> and &nbsp; 
                  <Link onClick={this.onLinkPress.bind(this, 'privacy')}>Privacy Policy</Link>
            </p>
          )}
          {this.props.type === 'default' && (
            <P className="footer__legal">
              SameWave co. legal information 	© 2019 
            </P>
          )}
      </Footer>
    );
  }
}

export default withRouter(FooterComponent);
