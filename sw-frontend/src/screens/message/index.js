import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid'
import { dispatch } from 'api/store'
import { apiQuery } from 'api/thunks/general'
import { General as config, Routes } from 'config'
import { userActions, mapDispatchToProps } from 'api/actions'
import { Button, Input, Header, Footer } from 'components'
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
  const [ messageSubject, setMessageSubject ] = useState('')
  const [ messages, setMessages ] = useState(
    [
      // {
      //   message: message ? message.message : '',
      //   owner_id: message ? message.owner_id : null,
      //   _id: message ? message._id : uuid()
      // }
    ]
  )

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

  const sendMessage = () => {
    const messageData = {
      subject: message.subject
        ? message.subject
        : messageSubject ? messageSubject : 'Hello!..',
      message: messageReply,
      recipient_id:
        message.recipient_id !== props.user.id
          ? message.recipient_id
          : message.owner_id,
      owner_id:
        message.owner_id !== props.user.id
          ? props.user.id
          : message.recipient_id
    }

    dispatch(
      apiQuery(
        messageData,
        props.sendMessage,
        config.EndPoints.messages,
        onSendResult,
        'POST'
      )
    )
  }

  const onSendResult = res => {
    if (res.status !== 200) {
      console.log('send error', res)
      return false
    }
  }

  const onMessagesResult = res => {
    if (res.status !== 200) {
      console.log('msgs error', res)
      return false
    }
    const msgs = res.data
    const conversation = [
      {
        message: message ? message.message : '',
        owner_id: message ? message.owner_id : null,
        _id: message ? message._id : uuid()
      }
    ]

    msgs.forEach((msg, i) => {
      if (
        (msg.owner_id === message.owner_id ||
          msg.recipient_id === message.owner_id) &&
        msg.subject === message.subject
      ) {
        // Exclude last message, its the original on we can see already
        // if (i !== 0)
        conversation.push(msg)
      }
    })

    conversation.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.updatedAt) - new Date(b.updatedAt)
    })

    setMessages(conversation.splice(1, conversation.length))
    console.log('Got MSgss,', res.data, conversation)
    setLoading(false)
  }

  const onInputChange = (value, name) => {
    setMessageReply(value)
  }

  const onSubjectChange = (value, name) => {
    setMessageSubject(value)
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
    sendMessage()
  }

  const onUserPress = userId => {
    props.history.push(`/${Routes.USER}/${userId}`)
  }

  console.log('Message', message, messages)
  return (
    <Mail>
      <Header title={''} backButton={true} homeButton={false} />
      <HeadTitle>
        {message && message.subject ? (
          message.subject
        ) : (
          <Input
            label='Enter Message Subject..'
            onChange={onSubjectChange}
            value={messageSubject}
            fieldName={'msgSubject'}
          />
        )}
      </HeadTitle>
      <MessageView>
        {messages.map(msg => {
          return (
            <MsgAlign
              self={msg.owner_id === props.user.id}
              key={msg._id + uuid()}>
              <Message key={msg._id} self={msg.owner_id === props.user.id}>
                {message &&
                message.owner && (
                  <UserName
                    self={msg.owner_id === props.user.id}
                    onClick={onUserPress.bind(null, msg.owner_id)}>
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
