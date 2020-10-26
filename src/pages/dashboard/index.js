import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import Box from 'react-bulma-components/lib/components/box';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useRematchDispatch from 'hooks/useRematchDispatch';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useRematchDispatch((dispatch) => ({
    logout: dispatch.auth.logout,
  }));

  return (
    <Container>
      <Heading>Dashboard</Heading>
      <Heading subtitle>
        {dayjs().format('D MMM')}, {user?.fullname} (
        <a href="#" onClick={() => logout()}>
          Logout
        </a>
        )
      </Heading>
      <Columns multiline>
        <Columns.Column size={6}>
          <Box></Box>
        </Columns.Column>
        <Columns.Column size={6}>
          <Box></Box>
        </Columns.Column>
        <Columns.Column size={12}>
          <Box></Box>
        </Columns.Column>
      </Columns>
    </Container>
  );
};

export default Dashboard;
