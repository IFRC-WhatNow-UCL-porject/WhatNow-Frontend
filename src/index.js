import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from "react-intl";
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './App';
import fetchAndLoadMessages from "./multiLanguage/helpers/getMessages";
import { getLanguage } from "./multiLanguage/helpers/useLanguage";

const clientId = '809538708912-obb9dc0qlslqdb0uandok8h9npnrdp0d.apps.googleusercontent.com';


const root = ReactDOM.createRoot(document.getElementById('root'));

const language = getLanguage();
const messages = await fetchAndLoadMessages();

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
      <IntlProvider
        locale={language}
        messages={messages[language]}
        onError={(error) => {
          console.log("Error: ", error);
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </IntlProvider>
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
