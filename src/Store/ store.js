import { configureStore } from '@reduxjs/toolkit';
import openaiApi from '../API/ apiSlice';


export const store = configureStore({
  reducer: {
    [openaiApi.reducerPath]: openaiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openaiApi.middleware),
});
