import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components'
import { ButtonGroup } from './styles'

const ButtonGroupComponent = props => {
  const onButtonPress = index => {
    console.log('set', index)
    props.items[index].action(index)
  }

  return (
    <ButtonGroup>
      {props.items.map((item, i) => (
        <Button
          key={item.title}
          title={item.title}
          onPress={onButtonPress.bind(null, i)}
          outlineDark
          selected={props.selected === i}
        />
      ))}
    </ButtonGroup>
  )
}

ButtonGroupComponent.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  selected: PropTypes.bool
}

ButtonGroupComponent.defaultProps = {
  type: 'default',
  selected: 0,
  items: [
    {
      title: 'default 1',
      action: () => {}
    },
    {
      title: 'default 2',
      action: () => {}
    },
    {
      title: 'default 3',
      action: () => {}
    }
  ]
}

export default ButtonGroupComponent
