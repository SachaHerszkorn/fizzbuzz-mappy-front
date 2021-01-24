/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './styles/index.scss';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading="loading" persistor={persistor}>
        <Suspense fallback="loading">
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
