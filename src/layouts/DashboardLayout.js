import React, { Suspense } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Breadcrumbs from 'components/Breadcrumbs';

const loading = () => <div className="text-center">Loading...</div>;

const DashboardLayout = ({ children }) => {
  return (
    <Section>
      <Columns centered={true}>
        <Columns.Column size={6}>
          <Breadcrumbs separator="arrow" style={{ marginBottom: '0.5rem' }} />
          <Suspense fallback={loading()}>{children}</Suspense>
        </Columns.Column>
      </Columns>
    </Section>
  );
};

export default DashboardLayout;
