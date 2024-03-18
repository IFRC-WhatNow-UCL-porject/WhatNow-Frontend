import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';

const clientId = '809538708912-obb9dc0qlslqdb0uandok8h9npnrdp0d.apps.googleusercontent.com';


const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);

root.render(
  <ErrorBoundary
    FallbackComponent={({ error }) => (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    )}
  >
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
