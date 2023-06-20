/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const UserList = ({ users, handleDeleteUser }) => {
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
                <Link className="view" to={`users/${user.id}`}>
                  <EyeIcon width={24} height={24} />
                </Link>
                <Link className="edit" to={`users/edit/${user.id}`}>
                  <PencilSquareIcon width={24} height={24} />
                </Link>
                <Link
                  className="delete"
                  to={`/`}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <TrashIcon width={24} height={24} />
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
