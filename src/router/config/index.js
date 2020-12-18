import React from 'react';
import PrivateRoute from '../PrivateRoute';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'helpers/authUtils';
import userRoutes from './user.routes';
import categoryRoutes from './category.routes';
import templateRoutes from './template.routes';

const Login = React.lazy(() => import('../../pages/auth/Login'));
const Dashboard = React.lazy(() => import('../../pages/dashboard'));

const indexRoutes = {
  path: '/',
  name: 'Index',
  component: () => {
    if (isAuthenticated()) return <Redirect to="/dashboard" />;
    else return <Redirect to="/login" />;
  },
  route: Route,
  exact: true,
};

const loginRoutes = {
  path: '/login',
  name: 'Login',
  component: Login,
  route: Route,
  exact: true,
};

const dashboardRoutes = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  route: PrivateRoute,
  exact: true,
};

const flattenRoutes = (routes) => {
  let flatRoutes = [];
  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== 'undefined') {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const flattenPublicRoutes = flattenRoutes([indexRoutes, loginRoutes]);
const flattenPrivateRoutes = flattenRoutes([dashboardRoutes, userRoutes, categoryRoutes, templateRoutes]);

export { flattenPublicRoutes, flattenPrivateRoutes };
