import React, {useState} from 'react'
import axios from 'axios'

function TestConnection(props) {

  const [response, setResponse] = useState('')

  const testConnection = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`${props.server}/api`)
      console.log(res.data)
      setResponse(res.data)
    }
    catch(err) {
      setResponse('Could not connect to the server')
    }
  }

  return (
    <div>
      <form onSubmit={testConnection}>
        <button type="submit">Connected?</button>
      </form>
      <br />
      {response}
    </div>
  )
}

export default TestConnection
