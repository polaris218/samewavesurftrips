import React, { useState } from 'react'
import {
  Container,
  ScrollContainer,
  Header,
  Tabs,
  Footer,
  MsgListItem
} from 'components'
import { Tools } from 'utils'
import { Mail, Empty, FootContainer } from './styles'

const MailScreen = props => {
  const [ state ] = useState({
    active: '',
    tabs: [ 'Direct', 'Group' ]
  })
  const [ messages, setMessages ] = useState([
    {
      message: 'I would like to talk about some stuff',
      trip: 'Trip title is what',
      _id: 1
    },
    {
      message: 'asdas sadI would like to talk about some stuff',
      trip: 'Another one',
      _id: 2
    },
    {
      message: 'asdas sadI would like to talk about some stuff',
      trip: 'And anopther onee',
      _id: 3
    }
  ])

  const onTabPress = value => {
    // console.log('On Tab ', state.tabs[value])
  }

  return (
    <Mail>
      <Header title={'Inbox'} />
      <Tabs tabs={state.tabs} onTabPress={onTabPress} />
      <ScrollContainer padTop={false} height={'55'}>
        <Container>
          {messages.length > 0 ? (
            messages.map(item => {
              return (
                <MsgListItem key={item._id} id={item._id} title={item.trip} />
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

export default MailScreen
