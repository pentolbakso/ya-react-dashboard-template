import React from 'react';
import PrivateRoute from '../PrivateRoute';

const Templates = React.lazy(() => import('../../pages/templates'));
const TemplateForm = React.lazy(() => import('../../pages/templates/TemplateForm'));

const path = '/templates';

const routes = {
  path: path,
  component: Templates,
  route: PrivateRoute,
  exact: true,
  children: [
    {
      path: `${path}/create`,
      name: 'Create',
      component: TemplateForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id/edit`,
      name: 'Edit',
      component: TemplateForm,
      route: PrivateRoute,
      exact: true,
    },
  ],
};

export default routes;
