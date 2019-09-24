import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { General as config, Routes } from 'config'
import { Avatar } from 'components'
import { ListItem, New, Title, From } from './styles'

const ListItemComponent = props => {
  const [ owner, setOwner ] = useState({})
  let mounted = true
  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const user = props.message.owner_id
      ? props.getUser(props.message.owner_id)
      : null
    user.then(item => {
      mounted && setOwner(item)
    })
  }, [])

  const onClick = ev => {
    if (props.onClick) {
      ev.preventDefault()
      props.onClick()
    }
    props.history.push(`/${Routes.MESSAGE}/${props.id}`, {
      ...props.message,
      owner
    })
  }

  const userAvatar = () => {
    let image = null
    if (owner && owner.avatar) {
      if (owner.avatar.includes('https://')) return owner.avatar
      image = config.EndPoints.digitalOcean + owner.avatar
    }
    return image
  }

  return (
    <ListItem onClick={onClick}>
      <From>
        <Avatar image={userAvatar()} />
        {`${owner && owner.first_name ? owner.first_name : ''} ${owner &&
        owner.last_name
          ? owner.last_name
          : ''}`}
      </From>
      <Title>{props.title}</Title>
      {props.message.msg_read ? '' : <New>NEW</New>}
    </ListItem>
  )
}

ListItemComponent.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  new: PropTypes.bool,
  id: PropTypes.string,
  getUser: PropTypes.func
}

ListItemComponent.defaultProps = {
  title: 'A new message read it look!',
  user: {},
  new: true,
  id: null,
  getUser: () => {}
}

export default withRouter(ListItemComponent)
