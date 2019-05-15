import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions, mapDispatchToProps } from 'api/actions'
import { Routes } from 'config'
import Drawer from '@material-ui/core/Drawer'
import { Tools } from 'utils'
import { BackButton, Logo, MenuItem } from 'components'
import { Header, NavFooter, NavLogo, HomeButton } from './styles'

class HeaderComponent extends PureComponent {
  static propTypes = {
    backButton: PropTypes.bool,
    homeButton: PropTypes.bool,
    title: PropTypes.string,
    nav: PropTypes.bool,
    rightIcon: PropTypes.object,
    rightAction: PropTypes.func
  }

  static defaultProps = {
    backButton: false,
    homeButton: true,
    title: '',
    nav: true,
    rightIcon: null,
    rightAction: () => {}
  }

  state = {
    drawerOpen: false
  }

  onLogoutPress = () => {
    this.props.userLogout()
    this.props.history.push('/' + Routes.LOGIN)
  }

  onLinkPress = link => {
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

    this.props.history.push('/' + route)
  }

  toggleDrawer = open => {
    this.setState({
      drawerOpen: open
    })
  }

  render () {
    return (
      <Header>
        {this.props.backButton && <BackButton />}
        {this.props.homeButton && (
          <HomeButton
            role='button'
            onClick={this.toggleDrawer.bind(this, true)}>
            {Tools.renderIcon('burger')}
          </HomeButton>
        )}
        <div className='header__title'>{this.props.title.toUpperCase()}</div>
        {this.props.rightIcon && (
          <div className='header__righticon' onClick={this.props.rightAction}>
            {this.props.rightIcon}
          </div>
        )}

        <Drawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer.bind(this, false)}>
          <div
            className='drawer__nav'
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer.bind(this, false)}
            onKeyDown={this.toggleDrawer.bind(this, false)}>
            <NavLogo>
              <Logo />
            </NavLogo>
            <MenuItem
              title='Settings'
              onPress={this.onLinkPress.bind(this, 'settings')}
            />
            <MenuItem
              title='Terms of Service'
              onPress={this.onLinkPress.bind(this, 'terms')}
            />
            <MenuItem
              title='Privacy Policies'
              onPress={this.onLinkPress.bind(this, 'privacy')}
            />
            <NavFooter>
              <MenuItem
                // color={Colors.GREY_LIGHT}
                title='Logout'
                onPress={this.onLogoutPress}
                icon={Tools.renderIcon('logout')}>
                Logout
              </MenuItem>
            </NavFooter>
          </div>
        </Drawer>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(HeaderComponent))
