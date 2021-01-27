import React from 'react';
import PrivateRoute from '../PrivateRoute';

const Chats = React.lazy(() => import('../../pages/chats'));
// const TemplateForm = React.lazy(() => import('../../pages/templates/TemplateForm'));

const path = '/chats';

const routes = {
  path: path,
  component: Chats,
  route: PrivateRoute,
  exact: true,
  children: [
    // {
    //   path: `${path}/:id/edit`,
    //   name: 'Edit',
    //   component: TemplateForm,
    //   route: PrivateRoute,
    //   exact: true,
    // },
  ],
};

export default routes;
