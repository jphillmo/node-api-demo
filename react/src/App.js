import logo from './logo.svg';
import './App.css';
import GetStudents from './components/student/GetStudents';
import AddStudent from './components/student/AddStudent';
import RemoveStudent from './components/student/RemoveStudent';
import StudentSearch from './components/student/StudentSearch';
import TestConnection from './components/connection/TestConnection';

function App() {
  const serverUrl = 'http://localhost:8080'
  return (
    <div className="App">
        <TestConnection server={serverUrl} />
        <AddStudent server={serverUrl} />
        <RemoveStudent server={serverUrl} />
        <StudentSearch server={serverUrl} />
        <GetStudents server={serverUrl} />
    </div>
  );
}

export default App;
