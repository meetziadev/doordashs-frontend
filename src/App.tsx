import React, { useEffect, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@pages/ErrorBoundary';
import { router } from '@routes/router';

const App: React.FC = () => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

