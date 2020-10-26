import React from 'react';
import NProgress from 'nprogress';
import '../assets/nprogress.css';

const ProgressLoader = () => {
  React.useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return null;
};

export default ProgressLoader;
