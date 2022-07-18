import * as React from 'react';
import { useSelector } from 'react-redux';

// import styles
import './scss/App.scss';

// import { actions } from slices location
import { submitRequest, reset } from './reducers/data.Slice.js'

// import two components
import DisplayBox from './components/DisplayBox';
import InputBox from './components/DisplayBox';

function App(props){
  // functionality with scope limited exclusively to the app page

  

  return (
    <>
      <div id="page">
        <div id="displayBox">
          <DisplayBox />
        </div>
      </div>
    </>
)};

export default App;