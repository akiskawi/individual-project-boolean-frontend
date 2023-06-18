import { useState, useEffect } from "react";
import api from "./api";
import { Link, Route, Routes } from "react-router-dom";
import UserList from "./components/user/UserList";
import UserAdd from "./components/user/UserAdd";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <>
        <nav>
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to={"/"}>Userss List</Link>
            </li>
            <li>
              <Link to={"/users/add"}>Add New Users</Link>
            </li>
          </ul>
        </nav>
        <main>
          {users ? (
            <Routes>
              <Route path="/" element={<UserList users={users} />} />
              {/* <Route path="/contacts/:id" element={<ContactsView />} /> */}
              {/* <Route
                path="/contacts/edit/:id"
                element={
                  <ContactsEdit contacts={contacts} setContacts={setContacts} />
                }
              /> */}
              <Route
                path="/users/add"
                element={
                  <UserAdd users={users} setUsers={setUsers} />
                }
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
