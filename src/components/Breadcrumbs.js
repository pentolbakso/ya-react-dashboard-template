import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bulma-components/lib/components/breadcrumb';
import { getSiteName } from 'helpers/configUtils';

function getBreadcrumbs(path = '') {
  const parts = path.split('/').filter((el) => Boolean(el));
  return parts.map((part, index) => {
    const to = '/' + parts.slice(0, index + 1).join('/');
    const page = part.includes('-') ? part : part.charAt(0).toUpperCase() + part.slice(1);
    return { to, page };
  });
}

const Breadcrumbs = (props) => {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  const crumbs = breadcrumbs
    .filter(({ page }) => page != 'Dashboard')
    .map(({ to, page }) => {
      return { name: page, url: to };
    });

  const homepage = { url: '/dashboard', name: getSiteName() };
  const items = [homepage, ...crumbs];

  return <Breadcrumb items={items} renderAs={NavLink} hrefAttr={'to'} {...props} />;
};

export default Breadcrumbs;
