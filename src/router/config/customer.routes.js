import React from 'react';
import PrivateRoute from '../PrivateRoute';

const Customers = React.lazy(() => import('../../pages/customers'));
const CustomerForm = React.lazy(() => import('../../pages/customers/CustomerForm'));
const CustomerDetail = React.lazy(() => import('../../pages/customers/CustomerDetail'));

const path = '/customers';

const routes = {
  path: path,
  component: Customers,
  route: PrivateRoute,
  exact: true,
  children: [
    {
      path: `${path}/create`,
      name: 'Create',
      component: CustomerForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id/edit`,
      name: 'Edit',
      component: CustomerForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id`,
      name: 'View',
      component: CustomerDetail,
      route: PrivateRoute,
      exact: true,
    },
  ],
};

export default routes;
