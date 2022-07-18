import React, { useState, useEffect, useContext, useReducer } from 'react';

function InputWindow(props){

//To add: 
    return(
    //  Input header
    <div id='inputWindow'>
        <h3> Input your person here: </h3>
    {/* //  "Name" label + input field */}
        <label for = 'name'>Name: </label><input id ='name' type = 'text'></input>    
        {/* //  "tail #" label + input field */}
        <label for = 'tail'>Tail: </label><input id ='tail' type = 'text'></input>  
    </div>
// ^^ source?
    )

}


// because of this reducer, input MUST OUTPUT an array, index 1 being null OR the registration, and index 0 being null OR a name
// async function fetchPlane() {
//   try { 
//     const response = await axios.get(`/api/planes/?${action.payload[1]}` || `/api/planes/?${action.payload[0]}`);
//     setPlane(response.data[0]);
//   } catch (err) {console.log(err)};
// }

export default InputWindow;