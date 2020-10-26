import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Section from 'react-bulma-components/lib/components/section';
import Heading from 'react-bulma-components/lib/components/heading';
import { Link } from 'react-router-dom';

const ErrorNotFound = () => {
  return (
    <Section>
      <Container className="has-text-centered">
        <Heading>404 - Not Found</Heading>
        <Heading subtitle>
          <Link to="/">Back to Home</Link>
        </Heading>
      </Container>
    </Section>
  );
};

export default ErrorNotFound;
