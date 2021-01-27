import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import Box from 'react-bulma-components/lib/components/box';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useRematchDispatch from 'hooks/useRematchDispatch';
import Button from 'react-bulma-components/lib/components/button';
import { useHistory } from 'react-router-dom';

const Whatsapp = () => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const { logout } = useRematchDispatch((dispatch) => ({
    logout: dispatch.auth.logout,
  }));

  return (
    <Container>
      <Heading className="has-text-weight-light">Whatsapp</Heading>
      <Columns multiline>
        <Columns.Column size={6}>
          <Box>
            <Heading size={5}>Nomor Telpon</Heading>
          </Box>
        </Columns.Column>
        <Columns.Column size={6}>
          <Box>QR Code kalau ada</Box>
        </Columns.Column>
      </Columns>
      <Heading size={5}>Log terakhir</Heading>
    </Container>
  );
};

export default Whatsapp;
