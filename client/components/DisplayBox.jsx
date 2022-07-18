import * as React from 'react';
// import InputBox from './InputBox';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import dataSlice from '../reducers/data.Slice';

import { useGetPlanesQuery } from '../reducers/apiSlice';
import { submitRequest } from '../reducers/data.Slice';

function InputBox() {
  const dispatch = useDispatch();

  const [fieldInput, setFieldInput] = useState('');

  const input = useSelector(state => state.userInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputFieldChange = (event) => {
    event.persist();
    setFieldInput(event.target.value);
  };

  const deliverSubmit = () => {
    dispatch({type: submitRequest, payload: fieldInput})
  }

  return (  
    <>
    <div className="inputAndSubmit">
      {input}
      <form className="inputBox" onSubmit={(e) => {
        handleSubmit(onSubmit)(e)
      }}>
        <input
          id="inputField"
          type="text"
          placeholder="ex: Bob Barker, N927VA, T-Pain" 
          value={input}
          onChange={handleInputFieldChange}
          />
      </form>
      <button
        id="submitInput" type="submit" onClick={(e) => {
        e.preventDefault();
        deliverSubmit();
        } }>Find that Metal Sky Bird!</button>
    </div>
    </>
  )
}

let PlaneEntry = ({ plane }) => {
  
  return (
    <div id="singleEntry" key={plane.id}>
      <h4>{plane.name}</h4>
      <div>
        <p>{plane.date}: {plane.name} flew on their plane, tail number {plane.registration}, from {plane.departure} to {plane.arrival}.</p>
      </div>
    </div>
  )};

const DisplayBox = () => {

  const input = useSelector((state) => state.userInput)

  const {
    data: planes,
    isLoading,
    isSuccess,
    isError,
    error, 
  } = useGetPlanesQuery(input);
  
  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = planes.map(plane => <PlaneEntry key={plane.id} plane={plane} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>
      <h3>Particular Planes + People</h3>
      <InputBox />
      <section className="planeList">
        {content}
      </section>
      
    </div>
  )
}

export default DisplayBox;