import * as React from 'react';
// import { useSelector } from 'react-redux';

// import styles
import './scss/App.scss';

// import { actions } from slices location
// import { submitRequest, reset } from './reducers/data.Slice.js'

// import two components
import DisplayBox from './components/DisplayBox';
import InputBox from './components/InputBox';

function App(){
  // functionality with scope limited exclusively to the app page

  return (
    <>
    <div className="titleBar"><h1>Public People's Plane Plots</h1></div>
    <div id="page">
      <div id="inputBox" className="inputBox">
        <InputBox />
      </div>
      <div id="displayBox" className="displayBox">
        <DisplayBox />
      </div>
    </div>
    </>
)};

export default App;