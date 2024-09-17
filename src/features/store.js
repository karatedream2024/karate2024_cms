
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import login from "./slice/login";

export const store = configureStore({
  reducer: {

    [api.reducerPath]: api.reducer,
    auth: login,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

});
 
