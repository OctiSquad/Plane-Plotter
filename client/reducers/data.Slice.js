import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInput: ''
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    submitRequest: (state, action) => {
      console.log(action.payload)
      const newState = (Object.assign({}, {...state}, { userInput: action.payload }))
      return {
        ...state, ...newState
      }
    },
    // insert other reducer functionality here
      reset: (state) => {return {...state, ...initialState}}
  }
})

// export all the actions destructured with the name of the slicer 
export const { submitRequest, reset } = dataSlice.actions;

// export default sliceName as sliceName.reducer
export default dataSlice.reducer;