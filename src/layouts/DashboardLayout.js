import React, { Suspense } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Element from 'react-bulma-components/lib/components/element';
import Container from 'react-bulma-components/lib/components/container';
import Breadcrumbs from 'components/Breadcrumbs';
import SidebarMenu from './SidebarMenu';

const loading = () => <div className="text-center">Loading...</div>;

const DashboardLayout = ({ children }) => {
  return (
    <Columns>
      <Columns.Column size={2} className="has-background-light" style={{ minHeight: '100vh' }}>
        <Section>
          <SidebarMenu />
        </Section>
      </Columns.Column>
      <Columns.Column>
        <Section>
          <Breadcrumbs separator="arrow" style={{ marginBottom: '0.5rem' }} />
          <Suspense fallback={loading()}>{children}</Suspense>
        </Section>
      </Columns.Column>
    </Columns>
  );
};

export default DashboardLayout;
