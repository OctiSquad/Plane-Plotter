import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PlaneDisplay () {

  const [input, setInput] = useState(null);
  const [plane, setPlane] = useState({});

  useEffect(() => {
    async function fetchPlane() {
      try { 
        const response = await axios.get(`/api/planes/?${input}`);
        setPlane(response.data[0]);
      } catch (err) {console.log(err)};
    }
    if (input) {
      fetchPlane();
    }
  }, [input]);
  
  let planeBox = <div>
    {plane.date}: {plane.name} flew on their plane, tail #{plane.registration}, from {plane.departure} to {plane.arrival}.
  </div>
return (
  <><div className='inputBar'>

    <form id="inputBoxes">

      {/* <input type="text" placeholder="name" id="name"></input> */}
      <input type="text" placeholder="ex: N927VA" id="registration"></input>

    </form>

    <div id="userAcctButtons">

      <button id="submitInput" type="submit" onClick={(e) => {
        e.preventDefault();
        setInput(document.getElementById('registration').value);
      } }>Find that Metal Sky Bird!</button>


    </div>

  </div>
  <div>
      {planeBox}
  </div></>
)};