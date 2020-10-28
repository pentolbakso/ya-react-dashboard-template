import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { flattenPublicRoutes, flattenPrivateRoutes } from './route.config';
import ErrorNotFound from '../pages/other/ErrorNotFound';
import ProgressLoader from '../components/NProgress';

const FullPageLayout = React.lazy(() => import('../layouts/FullPageLayout'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {flattenPublicRoutes.map((route, index) => {
          return (
            <route.route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => (
                <Suspense fallback={<ProgressLoader />}>
                  <FullPageLayout>
                    <route.component {...props} />
                  </FullPageLayout>
                </Suspense>
              )}
            />
          );
        })}
        {flattenPrivateRoutes.map((route, index) => {
          return (
            <route.route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props) => (
                <Suspense fallback={<ProgressLoader />}>
                  <DashboardLayout>
                    <route.component {...props} />
                  </DashboardLayout>
                </Suspense>
              )}
            />
          );
        })}
        <Route path="*" component={ErrorNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
