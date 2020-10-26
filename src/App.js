import React from 'react';
import Routes from './router/Routes';
import { Provider } from 'react-redux';
import store from './rematch/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getPersistor } from '@rematch/persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const persistor = getPersistor();

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Routes />
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        pauseOnHover
      />
    </PersistGate>
  );
}

export default App;
