import React, { Suspense } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';

const loading = () => <div className="text-center">Loading...</div>;

const DashboardLayout = ({ children }) => {
  return (
    <Section>
      <Columns centered={true}>
        <Columns.Column size={6}>
          <Suspense fallback={loading()}>{children}</Suspense>
        </Columns.Column>
      </Columns>
    </Section>
  );
};

export default DashboardLayout;
