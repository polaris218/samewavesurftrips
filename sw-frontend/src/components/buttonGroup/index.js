import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'components'
import { Tools } from 'utils'
import { ButtonGroup, Container, Row, More } from './styles'

const ButtonGroupComponent = props => {
  const onButtonPress = index => {
    props.action(index)
  }

  return (
    <Container>
      {props.items.length > 2 &&
      props.showMore && <More>{Tools.renderIcon('chevron')}</More>}
      <Row>
        <ButtonGroup showMore={props.showMore}>
          {props.items.map((item, i) => (
            <Button
              animated={false}
              key={item.title + i}
              title={item.title}
              onPress={onButtonPress.bind(null, i)}
              outlineDark
              selected={props.selected === i}
            />
          ))}
        </ButtonGroup>
      </Row>
    </Container>
  )
}

ButtonGroupComponent.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  selected: PropTypes.number,
  showMore: PropTypes.bool
}

ButtonGroupComponent.defaultProps = {
  type: 'default',
  showMore: true,
  selected: 0,
  action: () => {},
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
