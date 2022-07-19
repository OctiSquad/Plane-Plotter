import * as React from 'react';

// import styling
import './scss/App.scss';

// import two components
import DisplayBox from './components/DisplayBox';
import InputBox from './components/InputBox';

function App(){

  return (
    <>
    <div className="titleBar">
      <h1>Public People's Planes, Plotted</h1>
    </div>
    <div id="page">

      {/* note that there's no need to pass props in to InputBox or DisplayBox because of the react-redux hooks linking components to the store */}
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