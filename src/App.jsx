import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import './App.css';
import api from "./api";



function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e,id) => {
    console.log(id); 
  }

  return (
    <>
      <h1 className="text-amber-200">Front End API</h1>
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Height</th>
            <th>Weight</th>
            <th>BodyFat</th>
            <th>Goal Weight</th>
            <th>Goal BodyFat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.stats.height}</td>
              <td>{user.stats.weight}</td>
              <td>{user.stats.bodyFat}</td>
              <td>{user.goal.weight}</td>
              <td>{user.goal.bodyFat}</td>
              <td><button onClick={e=>handleClick(e,user.id)}>View Workouts</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
