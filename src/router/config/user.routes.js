import React from 'react';
import PrivateRoute from '../PrivateRoute';

const Users = React.lazy(() => import('../../pages/users'));
const UserForm = React.lazy(() => import('../../pages/users/UserForm'));
const UserDetail = React.lazy(() => import('../../pages/users/UserDetail'));

const path = '/users';

const routes = {
  path: path,
  component: Users,
  route: PrivateRoute,
  exact: true,
  children: [
    {
      path: `${path}/create`,
      name: 'Create',
      component: UserForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id/edit`,
      name: 'Edit',
      component: UserForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id`,
      name: 'View',
      component: UserDetail,
      route: PrivateRoute,
      exact: true,
    },
  ],
};

export default routes;
