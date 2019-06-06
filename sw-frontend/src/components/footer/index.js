import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions, mapDispatchToProps } from 'api/actions'
import { Routes } from 'config'
import { Link, P } from 'components'
import { Footer } from './styles'

const FooterComponent = props => {
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
      case 'logout':
        props.userLogout()
        route = Routes.LOGIN
        break
      default:
        route = Routes.LOGIN
        break
    }

    props.history.push('/' + route)
  }

  return (
    <Footer>
      {props.type === 'signup' && (
        <p>
          SameWave © 2019 .&nbsp;
          {/* <Link onClick={onLinkPress.bind(null, '#')}>
            Settings
          </Link>&nbsp;.&nbsp; */}
          <Link onClick={onLinkPress.bind(null, 'logout')}>Logout</Link>
          <br />By signing up you agree to our&nbsp;
          <Link onClick={onLinkPress.bind(null, 'terms')}>Terms</Link>, &nbsp;
          <Link onClick={onLinkPress.bind(null, 'data')}>Data Policy</Link> and
          &nbsp;
          <Link onClick={onLinkPress.bind(null, 'privacy')}>
            Privacy Policy
          </Link>
        </p>
      )}
      {props.type === 'default' && (
        <P className='footer__legal'>SameWave co. legal information © 2019</P>
      )}
    </Footer>
  )
}

FooterComponent.propTypes = {
  title: PropTypes.string,
  primary: PropTypes.bool,
  type: PropTypes.string
}

FooterComponent.defaultProps = {
  title: 'title',
  primary: false,
  type: 'signup'
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(FooterComponent))
