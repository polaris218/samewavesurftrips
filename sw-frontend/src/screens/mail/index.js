import React, { useState } from 'react'
import { Container, ScrollContainer, Header, Tabs, Footer } from 'components'
import { Tools } from 'utils'
import { Mail, Empty, FootContainer } from './styles'

const MailScreen = props => {
  const [ state ] = useState({
    active: '',
    tabs: [ 'Direct', 'Group', 'Notificaitons' ]
  })

  const onTabPress = value => {
    // console.log('On Tab ', state.tabs[value])
  }

  return (
    <Mail>
      <Header title={'Inbox'} />
      <Tabs tabs={state.tabs} onTabPress={onTabPress} />
      <ScrollContainer height={'55px'}>
        <Container>
          <Empty>
            {Tools.renderIcon('face_quite')}
            <div>
              <strong>OHHHH!</strong>
              <br />Things are quite at the moment in here.
              <br />Try joining a surf trip to get going.
            </div>
          </Empty>
        </Container>
      </ScrollContainer>
      <FootContainer>
        <Footer />
      </FootContainer>
    </Mail>
  )
}

export default MailScreen
