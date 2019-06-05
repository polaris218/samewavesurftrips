import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Header, Footer } from 'components'
// import { Tools } from 'utils'
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
  const message = props.location.state
  const [ messages, setMessages ] = useState([
    {
      message: message.message,
      _id: message._id
    }
  ])

  console.log('msg', props.location.state)
  return (
    <Mail>
      <Header title={''} backButton={true} homeButton={false} />
      <HeadTitle>{message.subject}</HeadTitle>
      <MessageView>
        {messages.map(msg => (
          <Message key={msg._id}>
            <UserName>{`${message.owner.first_name
              ? message.owner.first_name
              : ''} ${message.owner.last_name
              ? message.owner.last_name
              : ''}`}</UserName>
            {msg.message}
          </Message>
        ))}
      </MessageView>
      <MessageInput />
      <FootContainer>
        <Footer />
      </FootContainer>
    </Mail>
  )
}

export default withRouter(MessageScreen)
