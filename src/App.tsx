import React, { useEffect, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@pages/ErrorBoundary';
import { router } from '@routes/router';

import { Loader } from '@components/index';

const App: React.FC = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader fullScreen size="lg" text="Loading..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

