import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { App } from './styles';

const AppComponent = props => {

  useEffect(() => {
    // If not logged in, reset the route
    if(!props.accessToken) {
        props.history.push('/');
    }
  }, [])
  
  return (
    <App>
      {props.children}
    </App>
  );
}

AppComponent.propTypes = {
  accessToken: PropTypes.string
}

AppComponent.defaultProps = {
  accessToken: null
}

export default withRouter(AppComponent);
