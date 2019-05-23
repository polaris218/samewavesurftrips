import React from 'react';
import { Container, Header } from 'components';
import { Terms } from './styles';

const TermsScreen = props => {
  return (
    <Terms>
      <Container>
        <Header 
          nav={false}
          backButton
          homeButton={false}
          title="Terms and Conditions"
        />
      </Container>
    </Terms>
  );
}

export default TermsScreen;
