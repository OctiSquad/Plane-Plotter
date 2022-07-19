import * as React from 'react'
import { useDispatch } from 'react-redux';
import { submitRequest } from '../reducers/data.Slice';

import '../scss/InputBox.scss'
import buttonStyle from '../scss/button.scss'

function InputBox () {

  let input;
  
  // useDispatch is a redux built custom react hook which connects us to all the actions (reducers) set up in our store, but the reducers must be imported
  // useDispatch + a reducer import into a component is the same as mapDispatchToProps, and it makes a complicated container-component heirarchy completely unnecessary!
  const dispatch = useDispatch();

  // react hook which initializes fieldInput in a LOCALLY SCOPED state as an empty string
  // setFieldInput allows us to overwrite it with anything we write in the body of its invocation.
  const [fieldInput, setFieldInput] = React.useState('');

  // the whole submit/handleFieldInputChange link between the form and the button is a bit messy, but it works
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // this has to be a persistent event in order to make sure the value we're sending is everything entered into the input field
  // the persistent event in conjunction with onChange pointing to this function allows the value of fieldInput...
  // ...(again, within the locally scoped state) to be whatever is in the form's input box at any given moment
  const handleFieldInputChange = (event) => {
    event.persist();
    setFieldInput(event.target.value);
  };

  // the dispatched action and the payload management are defined within data.Slice.js
  // this sets the value userInput in the redux store to the value of the variable fieldInput when it's invoked
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
    {/* this button invokes the deliverSubmit function which dispatches submitRequest with the payload of fieldInput
    that function could be written here instead, but the simple invocation in the body of the button felt much more readable */}
    <button
    id="submitInput" type="submit" className = "btn-25" onClick={(e) => {
    e.preventDefault();
    deliverSubmit();
    } }
    >Find Person or Plane
    </button>
  </div>
  </>
  )
}
// export default as usual
export default InputBox;