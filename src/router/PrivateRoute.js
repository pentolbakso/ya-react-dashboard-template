import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../helpers/authUtils';

const PrivateRoute = ({ component: Component, path, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => {
      if (isAuthenticated()) return <Component {...props} />;
      // redirect to login if not authed
      return <Redirect to={{ pathname: '/login' }} />;
    }}
  />
);

export default PrivateRoute;
