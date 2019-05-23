import React from 'react';
import { Header, Container } from 'components';
import { Privacy } from './styles';

const PolicyScreen = props => {
  return (
    <Privacy>
      <Container>
        <Header 
          nav={false}
          backButton
          homeButton={false}
          title="Data & Privacy Policy"
        />
      </Container>
    </Privacy>
  );
}

export default PolicyScreen;
