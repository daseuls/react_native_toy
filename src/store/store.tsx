// createStore import
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
// 어떤 storage에 저장해놓고 데이터를 유지시킬지
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './modules';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};
