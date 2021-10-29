import React from 'react';
import {Provider} from 'react-redux';
import Main from '../myapp/src/components/Main/Main';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/store/store';
const App = () => {
  const storeConfig = configureStore();

  return (
    <Provider store={storeConfig.store}>
      <PersistGate persistor={storeConfig.persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
