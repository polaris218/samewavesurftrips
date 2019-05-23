import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions, mapDispatchToProps } from 'api/actions'
import { Routes } from 'config'
import Drawer from '@material-ui/core/Drawer'
import { Tools } from 'utils'
import { BackButton, Logo, MenuItem } from 'components'
import {
  Desktop,
  Header,
  NavFooter,
  NavLogo,
  HomeButton,
  Container,
  NavItem,
  LogoContainer
} from './styles'

const HeaderComponent = props => {
  const [ drawerOpen, setDrawOpen ] = useState(false)

  const onLogoutPress = () => {
    props.userLogout()
    props.history.push('/' + Routes.LOGIN)
  }

  const onLinkPress = link => {
    let route

    switch (link) {
      case 'terms':
        route = Routes.TERMS
        break
      case 'data':
        route = Routes.PRIVACY
        break
      case 'privacy':
        route = Routes.PRIVACY
        break
      default:
        route = Routes.LOGIN
        break
    }

    props.history.push('/' + route)
  }

  const toggleDrawer = open => {
    setDrawOpen(open)
  }

  const onNavItemPress = name => {
    props.history.push(`/${name}`)
  }

  return (
    <Header>
      <Container>
        <LogoContainer>
          <Logo color='grey' icon />
        </LogoContainer>
        {props.backButton && <BackButton />}
        {props.homeButton && (
          <HomeButton role='button' onClick={toggleDrawer.bind(null, true)}>
            {Tools.renderIcon('burger')}
          </HomeButton>
        )}
        <Desktop>
          <NavItem
            active={props.location.pathname === '/' + Routes.DASHBOARD}
            onClick={onNavItemPress.bind(false, Routes.DASHBOARD)}>
            Search
          </NavItem>
          <NavItem
            active={props.location.pathname === '/' + Routes.SURFTRIPS}
            onClick={onNavItemPress.bind(false, Routes.SURFTRIPS)}>
            Trips
          </NavItem>
          <NavItem
            active={props.location.pathname === '/' + Routes.MAIL}
            onClick={onNavItemPress.bind(false, Routes.MAIL)}>
            Inbox
          </NavItem>
          <NavItem
            active={props.location.pathname === '/' + Routes.PROFILE}
            onClick={onNavItemPress.bind(false, Routes.PROFILE)}>
            Profile
          </NavItem>
        </Desktop>

        <div className='header__title'>{props.title.toUpperCase()}</div>
        {props.rightIcon && (
          <div className='header__righticon' onClick={props.rightAction}>
            {props.rightIcon}
          </div>
        )}
      </Container>
      <Drawer open={drawerOpen} onClose={toggleDrawer.bind(null, false)}>
        <div
          className='drawer__nav'
          tabIndex={0}
          role='button'
          onClick={toggleDrawer.bind(null, false)}
          onKeyDown={toggleDrawer.bind(null, false)}>
          <NavLogo>
            <Logo icon color='white' />
          </NavLogo>
          <MenuItem
            title='Settings'
            onPress={onLinkPress.bind(null, 'settings')}
          />
          <MenuItem
            title='Terms of Service'
            onPress={onLinkPress.bind(null, 'terms')}
          />
          <MenuItem
            title='Privacy Policies'
            onPress={onLinkPress.bind(null, 'privacy')}
          />
          <NavFooter>
            <MenuItem
              // color={Colors.GREY_LIGHT}
              title='Logout'
              onPress={onLogoutPress}
              icon={Tools.renderIcon('logout')}>
              Logout
            </MenuItem>
          </NavFooter>
        </div>
      </Drawer>
    </Header>
  )
}

HeaderComponent.propTypes = {
  backButton: PropTypes.bool,
  homeButton: PropTypes.bool,
  title: PropTypes.string,
  nav: PropTypes.bool,
  rightIcon: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]),
  rightAction: PropTypes.func
}

HeaderComponent.defaultProps = {
  backButton: false,
  homeButton: true,
  title: '',
  nav: true,
  rightIcon: null,
  rightAction: () => {}
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(HeaderComponent))
