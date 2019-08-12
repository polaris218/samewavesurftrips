import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Colors } from 'config'
import { Avatar } from './styles'

const AvatarComponent = props => {
  const [ imageValid, setImageValid ] = useState(true)
  const imgRef = useRef(null)
  useEffect(() => {}, [])

  const onButtonPress = () => {
    props.onPress()
  }

  return (
    <Avatar onClick={onButtonPress} borderWidth={props.borderWidth}>
      {imageValid && props.image ? (
        <img
          ref={imgRef}
          src={props.image}
          alt='surfer profile'
          onError={e => {
            e.target.onerror = null
            props.image && setImageValid(false)
          }}
        />
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path
            fill={Colors.WHITE}
            d='M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z'
          />
        </svg>
      )}
    </Avatar>
  )
}

AvatarComponent.propTypes = {
  onPress: PropTypes.func,
  image: PropTypes.string,
  borderWidth: PropTypes.number
}

AvatarComponent.defaultProps = {
  image: null,
  onPress: () => {},
  borderWidth: 2
}

export default AvatarComponent
