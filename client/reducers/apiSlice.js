import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// define the single api slice object
export const apiSlice = createApi({
  // all of our requests will be starting with the /api/ url
  baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
  // this determines the endpoints queries will point to
  endpoints: builder => ({
    // the 'getPlanes' endpoint is a "query" operation that returns data
    getPlanes: builder.query({
      query: (input) => `planes/${input}`,
    }),
    // getPlanesByRegistration: builder.query({
    //   query: (registration) => `planes/${registration}`
    // }),
    // getPlanesByName: builder.query({
    //   query: (name) => `planes/${name}`
    // })
  })
})

export const { useGetPlanesQuery, useGetPlanesByNameQuery, useGetPlanesByRegistrationQuery } = apiSlice;

/* read more about how this works and why it's so useful here: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

 RTK Query's React integration will automatically generate React hooks for every endpoint we define! 

 The hooks are automatically named based on a standard convention:

    use, the normal prefix for any React hook
    The name of the endpoint, capitalized
    The type of the endpoint, Query or Mutation

In this case, our endpoint is getPlanes and it's a query endpoint, so the generated hook is useGetPlaneQuery. */