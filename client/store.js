import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
// import { composeWithDevTools } from '@reduxjs/toolkit'

import { apiSlice } from './reducers/apiSlice'
import dataReducer from './reducers/data.Slice'



export const store = configureStore({
  reducer: {
    // ensures that caching reducer is added in the right place
    data: dataReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    // enables caching, invalidation, polling, and other useful rtk-query features
    getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
  // devTools: false,
  // enhancers: [devToolsEnhancer({ realtime: true })],
})

// required for refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);