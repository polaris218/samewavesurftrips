import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import store, { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { userActions, tripActions, mapDispatchToProps } from 'api/actions'
import {
  Container,
  ScrollContainer,
  Header,
  Tabs,
  Footer,
  MsgListItem,
  Preloader
} from 'components'
import { Tools } from 'utils'
import { Mail, Empty, FootContainer, PreloadContainer } from './styles'

const MailScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ state ] = useState({
    active: '',
    tabs: [ 'Direct', 'Group' ]
  })

  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const onTabPress = value => {
    // console.log('On Tab ', state.tabs[value])
  }

  const getMessages = async () => {
    const bearerToken = 'Bearer ' + store.getState().user.accessToken
    const response = await axios({
      method: 'GET',
      url: `${config.EndPoints.messages}`,
      headers: { Authorization: bearerToken },
      validateStatus: status => {
        return true
      },
      timeout: config.APITimeout
    })
    if (response.status === 200) {
      console.log('MESSAGES? ___', response)
      setMessages(response.data)
      setLoading(false)
    }
  }

  const fetchUserDetails = async userId => {
    let user = {}
    await dispatch(
      apiQuery(
        null,
        props.surferDetails,
        config.EndPoints.user + `/${userId}`,
        res => (user = res.data),
        'get'
      )
    )
    return user
  }

  return (
    <Mail>
      <Header title={'Inbox'} />
      <Tabs tabs={state.tabs} onTabPress={onTabPress} />
      <ScrollContainer padTop={false} height={'55'}>
        <Container>
          {loading ? (
            <PreloadContainer>
              <Preloader />
            </PreloadContainer>
          ) : messages.length > 0 ? (
            messages.map(item => {
              // fetchUserDetails(item.owner_id)
              return (
                <MsgListItem
                  message={item}
                  key={item._id}
                  id={item._id}
                  title={item.subject}
                  getUser={fetchUserDetails}
                />
              )
            })
          ) : (
            <Empty>
              {Tools.renderIcon('face_quite')}
              <div>
                <strong>OHHHH!</strong>
                <br />Things are quite at the moment in here.
                <br />Try joining a surf trip to get going.
              </div>
            </Empty>
          )}
        </Container>
      </ScrollContainer>
      <FootContainer>
        <Footer />
      </FootContainer>
    </Mail>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trips
})

export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions, tripActions ])
)(withRouter(MailScreen))
