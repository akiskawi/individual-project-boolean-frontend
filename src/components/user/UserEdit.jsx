import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    api
      .get(`users/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    api
      .put(`users/${id}`, formData)
      .then( 
        (res) =>
          setUsers((prevState) =>
            prevState.map((user) =>
              user.id === res.data.id ? res.data : user
            )
          )
        
      )
      .catch((err) => console.log(err))
      .finally(navigate("/"));
  };

  return (
    <form className="form-stack user-form" onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Joe"
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Doe"
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email@example.com"
      />
      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
};
export default UserEdit;
