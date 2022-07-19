import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// define the single api slice object
export const apiSlice = createApi({
  // all of our requests made through these queries will be starting with the /api/ url
  baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
  // this determines the endpoints queries will point to
  endpoints: builder => ({
    // the 'getPlanes' endpoint is a "query" operation that returns data
    // the parameter for the anonymous function on the query method allows you to dynamically modify the url
    // there is no parameter required for a query builder
    getPlanes: builder.query({
      query: (input) => `planes/${input}`,
    }),
    // you can add more endpoints here with the (name): builder.query syntax
  })
})

// this export works much the same way the other slice (action & reducer bundle) export does. this file basically just creates a bunch of query actions
// they handle asynchronicity for you and are extremely simple to write. the naming is automatic:
// "use" + your constructed query, capitalized "GetPlanes" + Query
//  if you built a chaseDucks endpoint after getPlanes, it would need to be exported here as useChaseDucksQuery
export const { useGetPlanesQuery } = apiSlice;

/* read more about how this works and why it's so useful here: https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

 RTK Query's React integration will automatically generate React hooks for every endpoint we define! 

 The hooks are automatically named based on a standard convention:

    use, the normal prefix for any React hook
    The name of the endpoint, capitalized
    The type of the endpoint, Query or Mutation

In this case, our endpoint is getPlanes and it's a query endpoint, so the generated hook is useGetPlaneQuery. */