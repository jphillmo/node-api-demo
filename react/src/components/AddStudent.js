import React, {useState} from 'react'
import axios from 'axios'

function AddStudent(props) {

  const [student, setStudent] = useState({fname: '', lname: '', email: ''})
  const [response, setResponse] = useState('')

  // Connect to api and add student to database
  const addStudent = async (e) => {
    e.preventDefault()
    if (student.fname && student.lname && student.email) {
      try {
        const res = await axios.post(`${props.server}/students`, { params: student})
        console.log(res.data)
        setResponse(`${res.data.fname} ${res.data.lname} at ${res.data.email} was added!`)
      }
      catch(err) {
        console.log(err)
        if (err.response) {
          console.log(err.response.data)
          setResponse(err.response.data)
        }
        else {
          setResponse("Could not add student due to no server connection")
        }
      }
      setStudent({fname: '', lname: '', email: ''})
    }
    else setResponse("One or more input fields are empty.  Please enter a first name, last name, and email.")
  }

  return (
    <div>
      <h4>Add a student</h4>
      <form onSubmit={addStudent}>
        <label>First Name: </label>
        <input
          type="text"
          value={student.fname}
          onChange={e => setStudent({...student, fname: e.target.value})}
        /><br />
        <label>Last Name: </label>
        <input
          type="text"
          value={student.lname}
          onChange={e => setStudent({...student, lname: e.target.value})}
        /><br />
        <label>Email: </label>
        <input
          type="text"
          value={student.email}
          onChange={e => setStudent({...student, email: e.target.value})}
        /><br />
        <button type="submit">Add Student</button><br />
      </form>
      {response}
    </div>
  )
}

export default AddStudent
