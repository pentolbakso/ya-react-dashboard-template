import { init } from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import * as models from './models';

const persistConfig = {
  key: 'tsl-chat',
  whitelist: ['auth'],
  storage,
  version: 1,
};

const initStore = () =>
  init({
    plugins: [loadingPlugin(), persistPlugin(persistConfig)],
    models,
  });

const store = initStore();

export default store;
