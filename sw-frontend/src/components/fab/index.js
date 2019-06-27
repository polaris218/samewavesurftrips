import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Routes } from 'config'
import { Fab } from './styles'

const FabComponent = props => {
  const onPress = () => {
    let route = ''
    if (props.action === 'create') route = `/${Routes.CREATE}`
    if (props.action === 'message') route = `/${Routes.MESSAGE}/${props.id}`

    props.history.push(route)
  }

  return (
    <Fab onClick={onPress}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <path d='M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z' />
      </svg>
    </Fab>
  )
}

FabComponent.propTypes = {
  action: PropTypes.string
}

FabComponent.defaultProps = {
  action: `create`
}

export default withRouter(FabComponent)
