import React, { Suspense } from 'react';

const loading = () => null;

const FullPageLayout = ({ children }) => {
  return <Suspense fallback={loading()}>{children}</Suspense>;
};

export default FullPageLayout;
