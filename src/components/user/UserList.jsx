/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import api from "../../api";

const UserList = ({ users,handleDeleteUser }) => {
 
  return (
    <>
      <header>
        <h2>Users</h2>
      </header>
      <ul className="user-list">
        {users.map((user, index) => {
          return (
            <li className="user" key={index}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p className="links">
                <Link to={`users/${user.id}`}>View</Link>
                <Link to={`users/edit/${user.id}`}>Edit</Link>
                <Link to={`/`} onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserList;
