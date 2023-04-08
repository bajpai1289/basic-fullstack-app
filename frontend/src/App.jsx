import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/users`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err?.message)
      }
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <h1>Data from mongoDB:</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}><strong>{user.username}</strong><br />{user.firstname} {user.lastname}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
