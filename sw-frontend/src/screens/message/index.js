import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid'

import { Header, Footer } from 'components'
import store, { dispatch } from 'api/store'
import { userActions, mapDispatchToProps } from 'api/actions'
import { Button, Input } from 'components'
import {
  MessageView,
  Message,
  Mail,
  HeadTitle,
  FootContainer,
  UserName,
  MsgAlign,
  MessageInput,
  SendMsg
} from './styles'

const MessageScreen = props => {
  const message = props.location.state
  const [ messageReply, setMessageReply ] = useState('')
  const [ messages, setMessages ] = useState([
    {
      message: message.message,
      owner_id: message.owner_id,
      _id: message._id
    }
  ])

  const onInputChange = (value, name) => {
    setMessageReply(value)
  }

  const onSendPress = () => {
    const reply = {
      message: messageReply,
      owner_id: props.user.id,
      owner: {},
      _id: uuid()
    }
    setMessages([ ...messages, reply ])
    setMessageReply('')
  }

  return (
    <Mail>
      <Header title={''} backButton={true} homeButton={false} />
      <HeadTitle>{message.subject}</HeadTitle>
      <MessageView>
        {messages.map((msg, i) => {
          const alternate = false
          //     messages[i - 1] && msg.owner_id !== messages[i - 1].owner_id
          //   console.log(alternate, messages[i - 1])
          return (
            <MsgAlign self={msg.owner_id === props.user.id} key={msg._id}>
              <Message key={msg._id} self={msg.owner_id === props.user.id}>
                <UserName self={msg.owner_id === props.user.id}>
                  {`${message.owner.first_name
                    ? message.owner.first_name
                    : ''} ${message.owner.last_name
                    ? message.owner.last_name
                    : ''}`}
                </UserName>
                {msg.message}
              </Message>
            </MsgAlign>
          )
        })}
      </MessageView>
      <MessageInput>
        <Input
          label='Reply...'
          onChange={onInputChange}
          value={messageReply}
          fieldName={'msgReply'}
          multiline={true}
          rows={3}
        />
      </MessageInput>
      <SendMsg>
        <Button
          onPress={onSendPress}
          title='SEND'
          disabled={messageReply === ''}
        />
      </SendMsg>
      <FootContainer>
        <Footer />
      </FootContainer>
    </Mail>
  )
}

const mapStateToProps = state => ({
  user: state.user
})
export default connect(mapStateToProps, dispatch =>
  mapDispatchToProps(dispatch, [ userActions ])
)(withRouter(MessageScreen))
