import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm


// These lines use the useState hook to initialize three state variables:
//  title, load, and reps. Each state variable is associated with a piece
//  of data in the form.
// The useState('') syntax initializes each state variable with an empty
//  string as its default value.
// The functions setTitle, setLoad, and setReps are provided by useState
//  to update the corresponding state variables.


// This function, handleSubmit, is called when the form is submitted. 
// It prevents the default form submission behavior (preventing a page reload).

// The form data (title, load, reps) is collected and stored in a workout object.
// The component uses the fetch function to make a POST request to the /api/workouts endpoint.
// The body of the request contains the workout object converted to a JSON string.
// It checks if the title, load, and reps fields are not empty. If any field
//  is empty, it shows an alert and stops further processing.
// If all fields are filled, it creates a workout object with the form data
//  and calls the onSubmit function passed as a prop, passing the workout object.
// Finally, it clears the form fields by setting the state variables back to an empty string.
