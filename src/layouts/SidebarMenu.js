import React from 'react';
import Menu from 'react-bulma-components/lib/components/menu';
import Heading from 'react-bulma-components/lib/components/heading';
import { Link, useLocation } from 'react-router-dom';
import { getSiteName } from 'helpers/configUtils';

const MenuItem = ({ to, children, active }) => (
  <Menu.List.Item renderAs="span" active={active} className={active ? 'has-text-weight-semibold' : ''}>
    <Link to={to} style={active ? { backgroundColor: '#ddd' } : null}>
      {children}
    </Link>
  </Menu.List.Item>
);

const SidebarMenu = () => {
  const { pathname } = useLocation();
  const page = React.useMemo(() => {
    const parts = pathname.split('/');
    const page = parts.length >= 1 ? parts[1] : '?';
    return page;
  }, [pathname]);

  return (
    <Menu>
      <Heading>{getSiteName()}</Heading>
      <Menu.List title="General">
        <MenuItem to="/" active={page == 'dashboard'}>
          Dashboard
        </MenuItem>
        <MenuItem to="/places" active={page == 'places'}>
          Chats
        </MenuItem>
        <MenuItem to="/customers" active={page == 'customers'}>
          Customers
        </MenuItem>
      </Menu.List>
      <Menu.List title="Master Data">
        <MenuItem to="/users" active={page == 'users'}>
          Users
        </MenuItem>
        <MenuItem to="/categories" active={page == 'categories'}>
          Categories
        </MenuItem>
        <MenuItem to="/templates" active={page == 'templates'}>
          Reply Templates
        </MenuItem>
      </Menu.List>
      <Menu.List title="Whatsapp">
        <MenuItem to="/phone" active={page == 'phone'}>
          Phone
        </MenuItem>
        <MenuItem to="/wastatus" active={page == 'wastatus'}>
          Status / Logs
        </MenuItem>
      </Menu.List>
      <Menu.List title="Account">
        <MenuItem to="/edit-account" active={page == 'edit-account'}>
          Edit Account
        </MenuItem>
        <MenuItem to="/logout">Logout</MenuItem>
      </Menu.List>
    </Menu>
  );
};

export default SidebarMenu;
