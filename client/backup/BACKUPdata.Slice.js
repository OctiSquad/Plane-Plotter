import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchPlane = createAsyncThunk(
  'Object', async (registration, thunkAPI) => {
    const response = await server/server.js
  }
)

// async function fetchFromServer(name, reg){
//     const result = await fetch('/api/gimmePlaneLOL', { // prolly need to change fetch route 
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: name,
//         registration: reg
//       })
//     })
//     result = JSON.parse(result);
//     console.log(result);
//     return result;
//   }


// IF WE WANT TO SIMULATE THE RESPONSE DATA GIVING US MULTIPLE FLIGHTS BACK, SIMPLY ADD A FLIGHT LIST ARRAY, AND PUSH EVERY FLIGHT OBJECT THAT FITS INTO THAT ARRAY,
// THEN DISPLAY THE LIST ONE OBJECT AT A TIME

const initialState = {

  registration: '',
  name: '',
  flightNum: '',
  date: null, // note: may need to be string instead, depends on API response
  departureCity: '',
  arrivalCity: ''
}


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    submitRequest: (state, action) => {
      let plane = {};
      async function fetchPlane() {
        try { 
          const response = await axios.get(`/api/planes/?${action.payload[1]}` || `/api/planes/?${action.payload[0]}`);
          plane = Object.assign({}, response.data[0]);
          state.registration = plane.registration;
          state.name = plane.name;
          state.flightNum = plane.flightNum;
          state.date = plane.date;
          state.departureCity = plane.departure;
          state.arrivalCity = plane.arrival;
        } catch (err) {console.log(err)};
        if(action.payload) fetchPlane();
    }},
    reset: state => state = initialState
    // insert other reducer functionality here
}})

// export all the actions destructured with the name of the slicer 
export const { submitRequest, reset } = dataSlice.actions;

// export default sliceName as sliceName.reducer
export default dataSlice.reducer;