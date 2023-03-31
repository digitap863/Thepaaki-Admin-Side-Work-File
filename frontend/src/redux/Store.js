import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import adminReducer from "./slices/AdminData";

const persistconfig = { key: "root", storage };

const reducer = combineReducers({
  admin: adminReducer,
});

const persistReduce = persistReducer(persistconfig, reducer);
const store = configureStore({
  reducer: persistReduce,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
