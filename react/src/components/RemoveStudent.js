import React, {useState} from 'react'
import axios from 'axios'

function RemoveStudent(props) {

  const [student, setStudent] = useState({email: ''})
  const [response, setResponse] = useState('')

  const removeStudent = (e) => {
    e.preventDefault()
    if (student.email) {
      axios
        .delete(`${props.server}/students/${student.email}`)
        .then(res => {
          console.log(res.data)
          setResponse(`${res.data.fname} ${res.data.lname} at ${res.data.email} was removed!`)
        })
        .catch(err => {
          console.log(err)
          console.log(err.response.data)
          setResponse(err.response.data)
        })
      setStudent({email: ''})
    }
    else setResponse('Please enter a student email.')
  }

  return (
    <div>
      <form onSubmit={removeStudent}>
        <h4>Remove a student</h4>
        <label>Student email: </label>
        <input
          type="text"
          value={student.email}
          onChange={e => setStudent({email: e.target.value})}
        /><br />
        <button type="submit">Remove student</button><br />
      </form>
      {response}
    </div>
  )
}

export default RemoveStudent
