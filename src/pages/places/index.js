import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import Box from 'react-bulma-components/lib/components/box';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useRematchDispatch from 'hooks/useRematchDispatch';
import Button from 'react-bulma-components/lib/components/button';

const Places = () => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useRematchDispatch((dispatch) => ({
    logout: dispatch.place.logout,
  }));

  return (
    <Container>
      <Heading>Places</Heading>
      <Columns multiline>
        <Columns.Column size={6}></Columns.Column>
      </Columns>
    </Container>
  );
};

export default Places;
