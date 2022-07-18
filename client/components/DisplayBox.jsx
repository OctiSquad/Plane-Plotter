import * as React from 'react';
import { useSelector } from 'react-redux'

import { useGetPlanesQuery } from '../reducers/apiSlice';

let PlaneEntry = ({ plane }) => {
  
  return (
    <div id="singleEntry" key={plane.id}>
      <h3>{plane.name}</h3>
      <div>
        <p>{plane.date}: {plane.name} flew in a plane w/ the tail number {plane.registration}, from {plane.departure} to {plane.arrival}.</p>
      </div>
    </div>
  )};

const DisplayBox = () => {

  const input = useSelector((state) => state.data.userInput)

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
    // if (typeof planes.response === "string"){
    //   content = <p>{planes.response}</p>
    // }
    content = planes.map(plane => <PlaneEntry key={plane.id} plane={plane} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>
      <section className="planeList">
        {content}
      </section>
    </div>
  )
}

export default DisplayBox;