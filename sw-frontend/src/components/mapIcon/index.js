import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Colors } from 'config';
import { Tools } from 'utils';
import { TripIcon } from './styles';

const MapIconComponent = props => {

  const onClick = (ev) => {
    props.onTripPress(props.trip)
  }

  const renderIcon = () => {
    let icon = 'board';
    if(props.type === 'departing') {
      icon = 'van'
    }
    return Tools.renderIcon(icon);
  }

  return (
    <TripIcon
      size={props.size}
      type={props.type}
      onClick={onClick}
      active={props.active}
    >
      {renderIcon()}
    </TripIcon>
  );
}

MapIconComponent.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  trip: PropTypes.object,
  onTripPress: PropTypes.func,
  iconColor: PropTypes.string,
  active: PropTypes.bool
}

MapIconComponent.defaultProps = {
  type: "departing", // departing || destination
  trip: null,
  size: 'default', // default || large
  onTripPress: () => false,
  iconColor: Colors.GREEN_BASE,
  active: false
}

export default withRouter(MapIconComponent)