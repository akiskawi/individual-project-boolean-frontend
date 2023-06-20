import { useState, useEffect } from "react";
import api from "./api";
import { Link, Route, Routes } from "react-router-dom";
import UserList from "./components/user/UserList";
import UserAdd from "./components/user/UserAdd";
import UserView from "./components/user/UserView";
import WorkoutAdd from "./components/workout/WorkoutAdd";
import WorkoutView from "./components/workout/WorkoutView";
import ExerciseAdd from "./components/exercise/ExerciseAdd";
import UserEdit from "./components/user/UserEdit";

const testUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  stats: {
    id: 1,
    weight: 190.7,
    height: 6.2,
    bodyFat: "18%",
  },
  goal: {
    id: 1,
    weight: 180.5,
    bodyFat: "15%",
  },
};
function App() {
  const [users, setUsers] = useState(false);
  useEffect(() => {
    // setUsers([testUser])
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = (id) => {
    api
      .delete(`users/${id}`)
      .then((res) => {
        setUsers((users) => users.filter((u) => u.id !== res.data.id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <>
        <nav>
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to={"/"}>Users List</Link>
            </li>
            <li>
              <Link to={"/users/add"}>Add New Users</Link>
            </li>
          </ul>
        </nav>
        <main>
          {users ? (
            <Routes>
              <Route
                path="/"
                element={
                  <UserList users={users} handleDeleteUser={handleDeleteUser} />
                }
              />
              <Route path="/users/:id" element={<UserView />} />
              <Route path="/users/:id/workouts/add" element={<WorkoutAdd />} />
              <Route
                path="/users/:userId/workouts/:id"
                element={<WorkoutView />}
              />
              <Route
                path="/users/:userId/workouts/:id/exercises/add"
                element={<ExerciseAdd />}
              />

              <Route
                path="/users/edit/:id"
                element={
                  <UserEdit users={users} setUsers={setUsers} />
                }
              />
              <Route
                path="/users/add"
                element={<UserAdd users={users} setUsers={setUsers} />}
              />
              {/* <Route path="/contact/:id/meetings" element={<Meetings />} /> */}
            </Routes>
          ) : (
            <span className="loader"></span>
          )}
        </main>
      </>
    </>
  );
}

export default App;
