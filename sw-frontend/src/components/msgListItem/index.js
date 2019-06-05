import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Routes } from 'config'
import { ListItem, New, Title, From } from './styles'

const ListItemComponent = props => {
  const [ owner, setOwner ] = useState('Charlie')
  const onClick = ev => {
    if (props.onClick) {
      ev.preventDefault()
      props.onClick()
    }
    props.history.push(`/${Routes.MESSAGE}/${props.id}`)
  }

  return (
    <ListItem onClick={onClick}>
      <From>{owner}</From>
      <Title>{props.title}</Title>
      <New>New</New>
    </ListItem>
  )
}

ListItemComponent.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  new: PropTypes.bool,
  id: PropTypes.string
}

ListItemComponent.defaultProps = {
  title: 'A new message read it look!',
  user: {},
  new: true,
  id: null
}

export default withRouter(ListItemComponent)
