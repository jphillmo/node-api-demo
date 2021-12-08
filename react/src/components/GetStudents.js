import React, {useState} from 'react'
import axios from 'axios'

function GetStudents(props) {

  const [results, setResults] = useState([])
  
  const getStudents = () => {
    axios
      .get(`${props.server}/students`)
      .then(res => {
        if (res.data.length > 0)
          setResults(res.data)
        else
          setResults([])
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <h4>List of Students:</h4>
      <button onClick={getStudents}>Get all students</button><br />
      <ul>
        {results.map(student => (
          <li key={student.id}>
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