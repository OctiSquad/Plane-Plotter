import * as React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRequest } from '../reducers/data.Slice';

import '../scss/InputBox.scss'
import buttonStyle from '../scss/button.scss'

function InputBox () {

  const input = useSelector(state => state.userInput)

  const dispatch = useDispatch();

  const [fieldInput, setFieldInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFieldInputChange = (event) => {
    event.persist();
    setFieldInput(event.target.value);
  };

  const deliverSubmit = () => {
    dispatch({type: submitRequest, payload: fieldInput})
  }

  return (  
    <>
    <div className="inputDiv">
      <form className="inputAndSubmit" onSubmit={(e) => {
        handleSubmit(onSubmit)(e)
        }}>
        <input
          id="inputField"
          type="text"
          placeholder="ex: T-Pain, N340PK (T-Plane) " 
          value={input}
          onChange={handleFieldInputChange}
          />
      </form>
    </div>
  <div className="buttonBox">
    <button
    id="submitInput" type="submit" className = "btn-25" onClick={(e) => {
    e.preventDefault();
    deliverSubmit();
    } }
    >Find a Plane
    </button>
  </div>
  </>
  )
}

export default InputBox;