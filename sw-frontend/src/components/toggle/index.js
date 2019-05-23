import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Toggle, ToggleItem  } from './styles';

const ToggleComponent = props => {

  const [active, setActive] = useState(props.active);
  
  const onItemPress = (name) => {
    setActive(name);
    props.onPress(name);
  }

  const renderItem = (name, index) => {
    const item = <ToggleItem
      key={name.toUpperCase()}
      onClick={onItemPress.bind(this, name)}
      active={name === active}
      index={index}
    >
      {name.toUpperCase()}
    </ToggleItem>
    return item
  }

  return (
    <Toggle
      style={{...props.style}}
    >
        {props.items.map( (item, index) => {
            return renderItem(item, index)
        })}
    </Toggle>
  );
}

ToggleComponent.propTypes = {
  active: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func
}

ToggleComponent.defaultProps = {
  active: null,
  items: [],
  onPress: () => {}
}

export default ToggleComponent;
