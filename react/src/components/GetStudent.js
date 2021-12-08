import React, {useState} from 'react'
import axios from 'axios'

function GetStudent(props) {

  const [student, setStudent] = useState({id: '', fname: '', lname: '', email: ''})
  const [response, setResponse] = useState('')
  const [results, setResults] = useState([])
  const [search, setSearch] = useState(0)
  
  const getStudent = (e) => {
    e.preventDefault()
    let searchParams = ''
    if (search === 1)
      student.fname ? searchParams = `?fname=${student.fname}` : setResponse('Please enter a first name.')
    else if (search === 2)
      student.lname ? searchParams = `?lname=${student.lname}` : setResponse('Please enter a last name.')
    else if (search === 3)
      student.fname && student.lname ? searchParams = `?fname=${student.fname}&lname=${student.lname}` : setResponse('Please enter a first name and last.')
    else if (search === 4)
      student.email ? searchParams = `?email=${student.email}` : setResponse('Please enter an email.')
    else if (search === 5)
      student.id > 0 ? searchParams = `?id=${student.id}` : setResponse('Please enter a positive integer for student ID.')

    if (searchParams) {
      axios
        .get(`${props.server}/students${searchParams}`)
        .then(res => {
          if (res.data.length > 0)
            setResults(res.data)
          else
            setResults([])
          console.log(res.data)
          //console.log(results)
          setResponse(`${Object.keys(res.data).length} student(s) were found.`)
          console.log(`${Object.keys(res.data).length} student(s) were found.`)
          //console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      setStudent({id: '', fname: '', lname: '', email: ''})
    }
    else setResults([])
  }
  
  const chooseSearch = (choice) => {
    setSearch(choice)
    setStudent({id: '', fname: '', lname: '', email: ''})
    setResponse('')
    setResults([])
  }

  return (
    <div>
      <h4>Student Search</h4>
      <h5>Choose the type of search you want and enter the information for the student:</h5>

      <input type="radio" name="fnameSearch" checked={search === 1} onChange={(e) => chooseSearch(1)} />
      <label onClick={(e) => chooseSearch(1)}>First Name</label>&nbsp;&nbsp;&nbsp;

      <input type="radio" name="lnameSearch" checked={search === 2} onChange={(e) => chooseSearch(2)} />
      <label onClick={(e) => chooseSearch(2)}>Last Name</label>&nbsp;&nbsp;&nbsp;

      <input type="radio" name="fullnameSearch" checked={search === 3} onChange={(e) => chooseSearch(3)} />
      <label onClick={(e) => chooseSearch(3)}>Full Name</label>&nbsp;&nbsp;&nbsp;

      <input type="radio" name="emailSearch" checked={search === 4} onChange={(e) => chooseSearch(4)} />
      <label onClick={(e) => chooseSearch(4)}>Email</label>&nbsp;&nbsp;&nbsp;

      <input type="radio" name="idSearch" checked={search === 5} onChange={(e) => chooseSearch(5)} />
      <label onClick={(e) => chooseSearch(5)}>Student ID</label>&nbsp;&nbsp;&nbsp;
      
      {
        search === 1 && 
        <div>
          <br />
          <form onSubmit={getStudent}>
            <label>First Name: </label>
              <input
                type="text"
                value={student.fname}
                onChange={e => setStudent({...student, fname: e.target.value})}
              />
            <button type="submit">Search</button><br />
          </form>
        </div>
      }
      
      {
        search === 2 && 
        <div>
          <br />
          <form onSubmit={getStudent}>
            <label>Last Name: </label>
              <input
                type="text"
                value={student.lname}
                onChange={e => setStudent({...student, lname: e.target.value})}
              />
            <button type="submit">Search</button><br />
          </form>
        </div>
      }
      
      {
        search === 3 && 
        <div>
          <br />
          <form onSubmit={getStudent}>
            <label>First Name: </label>
              <input
                type="text"
                value={student.fname}
                onChange={e => setStudent({...student, fname: e.target.value})}
              />
            <button type="submit">Search</button>
            <br />
            <label>Last Name: </label>
              <input
                type="text"
                value={student.lname}
                onChange={e => setStudent({...student, lname: e.target.value})}
            />
          </form>
        </div>
      }
      
      {
        search === 4 && 
        <div>
          <br />
          <form onSubmit={getStudent}>
            <label>Email: </label>
            <input
              type="text"
              value={student.email}
              onChange={e => setStudent({...student, email: e.target.value})}
            />
            <button type="submit">Search</button><br />
          </form>
        </div>
      }
      
      {
        search === 5 && 
        <div>
          <br />
          <form onSubmit={getStudent}>
            <label>Student ID: </label>
            <input
              type="text"
              value={student.id}
              onChange={e => setStudent({...student, id: e.target.value})}
            />
            <button type="submit">Search</button><br />
          </form>
        </div>
        
      }

      {response}
      <br />
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

export default GetStudent