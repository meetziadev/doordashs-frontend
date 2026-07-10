import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/index.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from '@components/Toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider position="top-right" darkMode={false}>
          <App />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </Suspense>
);

