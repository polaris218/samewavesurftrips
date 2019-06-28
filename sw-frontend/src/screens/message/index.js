import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config } from 'config'
import { userActions, mapDispatchToProps } from 'api/actions'

import { Header, Footer } from 'components'
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
  const [ loading, setLoading ] = useState(true)
  const [ messageReply, setMessageReply ] = useState('')
  const [ messages, setMessages ] = useState([
    {
      message: message ? message.message : '',
      owner_id: message ? message.owner_id : null,
      _id: message ? message._id : null
    }
  ])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    dispatch(
      apiQuery(
        null,
        props.getMessages,
        config.EndPoints.messages,
        onMessagesResult,
        'GET'
      )
    )
  }

  const onMessagesResult = res => {
    if (res.status !== 200) {
      console.log('msgs error', res)
      return false
    }
    const msgs = res.data
    const conversation = []

    msgs.forEach((msg, i) => {
      if (
        msg.owner_id === messages[0].owner_id
        // ||
        // msg.recipient_id === messages[0].owner_id
      ) {
        conversation.push(msg)
      }
    })
    setMessages(conversation)
    console.log('Got MSgss,', res.data)
    setLoading(false)
  }

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
  console.log('Message', message)
  return (
    <Mail>
      <Header title={''} backButton={true} homeButton={false} />
      <HeadTitle>{message && message.subject}</HeadTitle>
      <MessageView>
        {messages.map(msg => {
          return (
            <MsgAlign self={msg.owner_id === props.user.id} key={msg._id}>
              <Message key={msg._id} self={msg.owner_id === props.user.id}>
                {message &&
                message.owner && (
                  <UserName self={msg.owner_id === props.user.id}>
                    {`${message.owner.first_name
                      ? message.owner.first_name
                      : ''} ${message.owner.last_name
                      ? message.owner.last_name
                      : ''}`}
                  </UserName>
                )}
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
          focus
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
