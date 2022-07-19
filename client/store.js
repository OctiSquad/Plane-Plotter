import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { apiSlice } from './reducers/apiSlice'
import dataReducer from './reducers/data.Slice'

// the configuration process for this file, the power of configureStore as a method, and the explanation of getDefaultMiddleware are in RTK documentation 
export const store = configureStore({
  reducer: {
    data: dataReducer,
    // ensures that caching reducer is added in the right place
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    // enables caching, invalidation, polling, and other useful RTKQuery features
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// required for refetchOnFocus and refetchOnReconnect behaviors, which we don't utilize yet but should
setupListeners(store.dispatch);