import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRequest } from '../reducers/data.Slice';
import * as React from 'react'

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
    <div className="inputDiv">
      <form className="inputAndSubmit" onSubmit={(e) => {
        handleSubmit(onSubmit)(e)
        }}>
        <input
          id="inputField"
          type="text"
          placeholder="ex: Bob Barker, N927VA, T-Pain" 
          value={input}
          onChange={handleFieldInputChange}
          />
      </form>
      <button
        id="submitInput" type="submit" onClick={(e) => {
        e.preventDefault();
        deliverSubmit();
        } }
        >Find that Metal Sky Bird!
      </button>
    </div>
  )
}

export default InputBox;