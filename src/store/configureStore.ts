import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используйте нужный тип хранилища, например, localStorage

import {createStore} from 'redux';
import {mapObjectReducer} from './mapSlice';
import store from "./store"; // Замените на свой корневой редьюсер

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, mapObjectReducer);

// export const store = createStore(persistedReducer);
export const persistor = persistStore(store);