import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'components'
import { Tab, AvatarConatiner } from './styles'

const TabComponent = props => {
  const renderIcon = () => {
    switch (props.icon) {
      case 'trips':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'>
            <rect width='16' height='16' fill='none' />
            <path d='M0,0H12V16L6,10,0,16Z' transform='translate(4)' />
          </svg>
        )

      case 'home':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17.141'
            height='16.594'
            viewBox='0 0 17.141 16.594'>
            <g transform='translate(0 -4.89)'>
              <path
                d='M16.926,12.987a.817.817,0,0,0-.067-1.17L9.2,5.114a.955.955,0,0,0-1.246.014L.266,12.174a.813.813,0,0,0-.037,1.168l.193.2a.84.84,0,0,0,1.154.088l.574-.514v7.531a.836.836,0,0,0,.836.836h3a.836.836,0,0,0,.836-.836V15.379H10.64v5.269a.79.79,0,0,0,.785.836H14.6a.836.836,0,0,0,.836-.836V13.223l.354.311c.2.172.606.034.917-.308Z'
                transform='translate(0 0)'
              />
            </g>
          </svg>
        )

      case 'search':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'>
            <rect width='16' height='16' fill='none' />
            <path d='M0,0H12V16L6,10,0,16Z' transform='translate(4)' />
          </svg>
        )

      case 'profile':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'>
            <g opacity='0.991'>
              <path d='M0,16V14c0-2.2,3.6-4,8-4s8,1.8,8,4v2ZM4,4A4,4,0,1,1,8,8,4,4,0,0,1,4,4Z' />
            </g>
          </svg>
        )

      case 'mail':
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'>
            <rect width='16' height='16' fill='none' />
            <path
              d='M14,2H2L8,7ZM0,2A2.006,2.006,0,0,1,2,0H14a2.006,2.006,0,0,1,2,2v8a2.006,2.006,0,0,1-2,2H2a2.006,2.006,0,0,1-2-2Z'
              transform='translate(0 2)'
            />
          </svg>
        )

      default:
        return (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M406.7 80.8c-3.1.5-6.4 1-9.9 1.4-13.2 1.7-42.8 5.2-60.6 5.2-27.7 0-52.8-6.8-78.2-12.2-25.8-5.5-52.4-11.2-80.6-11.2-56.2 0-75.3 12.1-77.3 13.4L96 80.3v353.3c0 7.2 5.2 13.4 12.3 14.3 8.5 1 15.7-5.6 15.7-13.9V279.6c0-3.8 2.7-7.1 6.4-7.9 10.5-2.1 25.8-3.9 47-3.9 26.2 0 50.7 10 76.6 15.5 26.4 5.6 48.6 11.5 83.4 11.5s71.8-6.6 71.8-6.6c3.9-.6 6.9-3.9 6.9-7.9V88.7c-.1-4.9-4.5-8.7-9.4-7.9z' />
          </svg>
        )
    }
  }

  const onTabPress = () => {
    props.onTabPress()
  }

  return (
    <Tab
      onClick={() => onTabPress()}
      className={props.active === `/${props.title}` ? 'tab-active' : null}>
      {props.userImg ? (
        <AvatarConatiner active={props.active === `/profile`}>
          <Avatar image={props.userImg} />
        </AvatarConatiner>
      ) : (
        <div className='icon'>{renderIcon()}</div>
      )}
    </Tab>
  )
}

TabComponent.propTypes = {
  onTabPress: PropTypes.func,
  active: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  userImg: PropTypes.string
}

TabComponent.defaultProps = {
  onTabPress: () => {},
  title: 'tab',
  icon: 'trips',
  active: null,
  userImg: ''
}

export default TabComponent
