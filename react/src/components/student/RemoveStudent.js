import React, {useState} from 'react'
import axios from 'axios'

function RemoveStudent(props) {

  const [student, setStudent] = useState({value: ''})
  const [response, setResponse] = useState('')

  const removeStudent = async (e) => {
    e.preventDefault()
    if (student.value) {
      try {
        const res = await axios.delete(`${props.server}/api/students/${student.value}`)
        console.log(res.data)
        setResponse(`${res.data.fname} ${res.data.lname} at ${res.data.email} was removed!`)
      }
      catch(err) {
        console.log(err)
        if (err.response) {
          console.log(err.response.data)
          setResponse(err.response.data)
        }
        else
          setResponse("Could not remove student due to no server connection")
      }
      setStudent({value: ''})
    }
    else setResponse('Please enter a student ID or email.')
  }

  return (
    <div>
      <h4>Remove a student</h4>
      <form onSubmit={removeStudent}>
        <label>Student ID or Email: </label>
        <input
          type="text"
          value={student.value}
          onChange={e => setStudent({value: e.target.value})}
        /><br />
        <button type="submit">Remove student</button><br />
      </form>
      {response}
    </div>
  )
}

export default RemoveStudent
