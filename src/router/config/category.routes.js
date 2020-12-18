import React from 'react';
import PrivateRoute from '../PrivateRoute';

const Categories = React.lazy(() => import('../../pages/categories'));
const CategoryForm = React.lazy(() => import('../../pages/categories/CategoryForm'));
const CategoryDetail = React.lazy(() => import('../../pages/categories/CategoryDetail'));

const path = '/categories';

const routes = {
  path: path,
  component: Categories,
  route: PrivateRoute,
  exact: true,
  children: [
    {
      path: `${path}/create`,
      name: 'Create',
      component: CategoryForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id/edit`,
      name: 'Edit',
      component: CategoryForm,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: `${path}/:id`,
      name: 'View',
      component: CategoryDetail,
      route: PrivateRoute,
      exact: true,
    },
  ],
};

export default routes;
