import React, {useState} from 'react'
import axios from 'axios'

function GetStudents(props) {

  const [results, setResults] = useState([])
  const [response, setResponse] = useState('')

  const getStudents = async () => {
    try {
      const res = await axios.get(`${props.server}/api/students`)
      if (res.data.length > 0) {
        setResults(res.data)
        setResponse(`Total number of students: ${res.data.length}`)
      }
      else {
        setResults([])
        setResponse("There are no students in the database")
      }
      console.log(res.data)
    }
    catch(err) {
      console.log(err)
      setResponse("Could not get student data due to no server connection")
    }
  }

  return (
    <div>
      <h4>List of Students:</h4>
      <button onClick={getStudents}>Get all students</button><br />
      {response}
      <br />
      <ul>
        {results.map(student => (
          <li key={student.id}>
            ID: {student.id},
            First Name: {student.fname},
            Last Name: {student.lname},
            Email: {student.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetStudents