import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { dispatch } from 'api/store'
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
  Preloader,
  Fab
} from 'components'
import { Tools } from 'utils'
import {
  Mail,
  Empty,
  FootContainer,
  ContentContainer,
  PreloadContainer
} from './styles'

const MailScreen = props => {
  const [ loading, setLoading ] = useState(true)
  const [ state ] = useState({
    tabs: [ 'Direct', 'Group' ]
  })
  const [ activeTab, setActiveTab ] = useState(state.tabs[0])
  const [ messageList, setMessageList ] = useState([])
  const [ messages, setMessages ] = useState([])
  let mounted = true

  /*
   * Component Will Unmount HOOK
   */

  useEffect(() => {
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    fetchOwnTrips()
  }, [])

  useEffect(
    () => {
      filterMsgs(messages)
    },
    [ messages, activeTab ]
  )

  const onTabPress = value => {
    console.log('On Tab ', state.tabs[value], activeTab)
    mounted && setActiveTab(state.tabs[value])
  }

  const fetchOwnTrips = () => {
    mounted && setLoading(true)
    dispatch(
      apiQuery(
        null,
        props.fetchOwnTrips,
        config.EndPoints.trips + `/${props.user.id}`,
        onFetchTripsResult,
        'get'
      )
    )
  }

  const onFetchTripsResult = error => {
    if (error.status !== 200) {
      console.log('fetch trip error', error)
    } else {
      getMessages()
    }
  }

  const getMessages = async () => {
    await dispatch(
      apiQuery(
        null,
        props.getMessages,
        config.EndPoints.messages,
        onMessagesResult,
        'get'
      )
    )
  }

  const onMessagesResult = res => {
    if (res.status !== 200) {
      console.log('msgs error', res)
      return false
    }
    mounted && setMessages(res.data)
    mounted && setLoading(false)
  }

  const filterMsgs = messages => {
    const direct = messages.filter(message => !message.trip_id)
    const group = messages.filter(message => message.trip_id)
    const uniqueIds = [ ...new Set(group.map(msg => msg.trip_id)) ]
    const uniqueGroup = []

    group.forEach(msg => {
      const exists = uniqueGroup.filter(t => t.trip_id === msg.trip_id)
      // Check if still an active Trip memember
      const activeTrip = props.trips.yourTrips.filter(
        a => a._id === msg.trip_id
      )
      console.log('acitve__', activeTrip)
      if (exists.length === 0) {
        // If still joined, populate the list
        if (activeTrip.length) uniqueGroup.push(msg)
      }
    })

    console.log('direct', direct, group, uniqueGroup, uniqueIds)

    setMessageList(activeTab === state.tabs[0] ? direct : uniqueGroup)
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
        <ContentContainer>
          <Container>
            {loading ? (
              <PreloadContainer>
                <Preloader />
              </PreloadContainer>
            ) : messageList.length > 0 ? (
              messageList.map(item => {
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
        </ContentContainer>
      </ScrollContainer>
      <Fab action='message' />
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
