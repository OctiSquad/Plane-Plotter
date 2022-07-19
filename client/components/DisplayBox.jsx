import * as React from 'react';
import { useSelector } from 'react-redux'

import { useGetPlanesQuery } from '../reducers/apiSlice';

// each planeEntry displays the information contained within one document returned from the input query
let PlaneEntry = ({ plane }) => {
  // no functionality necessary, but could feasibly be added here to implement buttons to delete cards, update a field, or the like
  return (
    <div id="singleEntry" key={plane.id}>
      <h3>{plane.name}</h3>
      <div>
        <p>{plane.date}: {plane.name} flew in a plane w/ the tail number {plane.registration} from {plane.departure} to {plane.arrival}.</p>
      </div>
    </div>
  )};

// the default component getting exported
const DisplayBox = () => {

  // useSelector here is subscribing to the value userInput in the redux store
  // any time userInput in the store changes, this entire component renders again, with input being the new value in the store
  // this is equivalent to mapStateToProps, with the advantage of eliminating the need for a complicated container-component heirarchy
  const input = useSelector((state) => state.data.userInput)

  // this is a deconstructured version of the response we get from mongoose.find passing in input,
  // with additional functionality for checking the current state of the fetch/response process provided by RTKQuery
    // the route being invoked here can be figured out by looking at the getPlanes query constructor
  const {
    data: planes,
    isLoading,
    isSuccess,
    isError,
    error, 
  } = useGetPlanesQuery(input);

  // this is what changes what's rendering based on the current state of the useGetPlanesQuery above
  let content;
  if (isLoading) {
    // this could be replaced with an animated spinner or something along those lines if one were to import it...
    content = <p>Loading...</p>

  } else if (isSuccess) {
    // this maps every document from the response onto a plane entry
    // this key declaration is actually irresponsible, as one person flying the same plane spawns multiple children with the same ID
    // would be much better to pass in the mongoose document id as the key to make sure every child element's key is unique
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
// as always, exporting default to be referenced in the body of the app
export default DisplayBox;