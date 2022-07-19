import { createSlice } from '@reduxjs/toolkit';

// declaring initial state just like you would in vanilla redux
const initialState = {
  userInput: ''
}

export const dataSlice = createSlice({
  // the name here matters for the import into the store (note that it's titled "dataReducer" in the import - this is doing the reducer bundling FOR you)
  name: 'data',
  // your reducers will have current state passed in. this initialState pass is only for the setup, initialization, and a reset
  initialState,
  reducers: {
    submitRequest: (state, action) => {
      // this is simply overwriting userInput in the state with whatever the payload is,
      // then returning the new state object for components to re-render with... see the redux data flow chart!
      const newState = (Object.assign({}, {...state}, { userInput: action.payload }))
      return {
        ...state, ...newState
      }
    },
    // insert other reducer functionality here
    // this is a convenient reducer to have set up but not mandatory, and never got used elsewhere in this codebase, but would if we had persistent data
    reset: (state) => {return {...state, ...initialState}}
  }
})

// export all the actions destructured with the name of the slicer 
export const { submitRequest, reset } = dataSlice.actions;

// export default sliceName as sliceName.reducer
export default dataSlice.reducer;