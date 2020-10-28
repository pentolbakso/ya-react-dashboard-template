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
import DashboardStats from './DashboardStats';

const Dashboard = () => {
  const history = useHistory();
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
        <Columns.Column size={12}>
          <Box>
            <DashboardStats />
          </Box>
        </Columns.Column>
        <Columns.Column size={6}>
          <Box>
            <Heading size={5}>(0) Places</Heading>
            <Button.Group>
              <Button onClick={() => history.push('/places')}>Browse</Button>
              <Button onClick={() => history.push('/places/create')}>Create</Button>
            </Button.Group>
          </Box>
        </Columns.Column>
        <Columns.Column size={6}>
          <Box>
            <Heading size={5}>Data</Heading>
          </Box>
        </Columns.Column>
      </Columns>
    </Container>
  );
};

export default Dashboard;
