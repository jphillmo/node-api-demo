import logo from './logo.svg';
import './App.css';
import GetStudents from './components/GetStudents';
import AddStudent from './components/AddStudent';
import RemoveStudent from './components/RemoveStudent';
import GetStudent from './components/GetStudent';

function App() {
  const serverUrl = 'http://localhost:8080'
  return (
    <div className="App">
        <form action="/connected" method="get" className="form">
          <button type="submit">Connected?</button>
        </form>
        <AddStudent server={serverUrl} />
        <RemoveStudent server={serverUrl} />
        <GetStudent server={serverUrl} />
        <GetStudents server={serverUrl} />
    </div>
  );
}

export default App;
