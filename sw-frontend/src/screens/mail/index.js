import React, { useState } from 'react';
import { Container, Header, Tabs } from 'components';
import { Mail } from './styles';

const MailScreen = props => {
  
  const [state] = useState({
    active: '',
    tabs: ['Direct', 'Group', 'Notificaitons']
  });

  const onTabPress = (value) => {
    console.log('On Tab ', state.tabs[value])
  }

  return (
    <Mail>
        <Header title={'Inbox'} />
        <Tabs
          tabs={state.tabs}
          onTabPress={onTabPress}
        />
        <Container>
        </Container>
    </Mail>
  );
}

export default MailScreen;
