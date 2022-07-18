// import functionality from react
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


// import app
import App from './App';
import { store } from './store';

// render the app
ReactDOM.render(
  // StrictMode is a tool for highlighting potential problems in an application
  // Strict mode checks are run in development mode only; they do not impact the production build
  // read more here: https://reactjs.org/docs/strict-mode.html
  <React.StrictMode>
    <Provider const store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

