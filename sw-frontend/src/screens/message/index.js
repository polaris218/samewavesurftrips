import React, { useState } from 'react'
import { Header, Footer } from 'components'
import { Tools } from 'utils'
import {
  MessageView,
  Message,
  Mail,
  HeadTitle,
  FootContainer,
  UserName,
  MessageInput
} from './styles'

const MessageScreen = props => {
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

  return (
    <Mail>
      <Header title={''} backButton={true} homeButton={false} />
      <HeadTitle>THE TRIP TITLE HERE</HeadTitle>
      <MessageView>
        {messages.map(message => (
          <Message key={message._id}>
            <UserName>userName</UserName>
            {message.message}
          </Message>
        ))}
      </MessageView>
      <MessageInput>Enther tha mesg</MessageInput>
      <FootContainer>
        <Footer />
      </FootContainer>
    </Mail>
  )
}

export default MessageScreen
