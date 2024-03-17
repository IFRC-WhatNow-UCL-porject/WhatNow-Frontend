import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import authReducer from "./features/auth.slice";
import NsAdminReducer from "./features/ns_admin.slice";
import MessagesReducer from "./features/messages.slice";
import ApiUserReducer from "./features/api_user.slice";
import GdpcAdminReducer from "./features/gdpc_admin.slice";

const reducers = combineReducers({
  auth: authReducer,
  ns_admin: NsAdminReducer,
  messages: MessagesReducer,
  api_user: ApiUserReducer,
  gdpc_admin: GdpcAdminReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist:['page404']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});