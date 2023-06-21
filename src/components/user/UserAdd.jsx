/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import api from "../../api";
const initDataUser = {
  firstName: "",
  lastName: "",
  email: "",
  stats: {
    weight: "",
    height: "",
    bodyFat: "",
  },
  goals: {
    weight: "",
    bodyFat: "",
  },
};

const UserAdd = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initDataUser);

  const handleChange = (e) => {
    if (e.target.type === "text") {
      if (/\d/.test(e.nativeEvent.data)) {
        e.target.classList.add("wrong");
        setTimeout(function () {
          e.target.classList.remove("wrong");
        }, 300);
        return;
      }
    }
    const { name, value } = e.target;
    const names = name.split(" ");
    if (names.length == 1) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      const newFormData = { ...formData };
      newFormData[names[0]][names[1]] = value;
      setFormData(newFormData);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setFormData(initDataUser);
  };
  const postData = () => {
    api
      .post("/users", formData)
      .then((res) => {
        const newUser = res.data;
        setUsers([...users, newUser]);
      })
      .catch((err) => console.log(err))
      .finally(navigate("/"));
  };

  return (
    <form
      // onKeyDownCapture={handleNameChange}
      className="form-stack user-form"
      onSubmit={handleSubmit}
    >
      <h2>Create User</h2>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Joe"
        required
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Doe"
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />
      <h3>Stats</h3>
      <label htmlFor="CHeight">Current Height:</label>
      <input
        id="CHeight"
        name="stats height"
        type="number"
        value={formData.stats.height}
        onChange={handleChange}
        placeholder="6.2"
        required
      />
      <label htmlFor="CWeight">Current Weight:</label>
      <input
        id="CWeight"
        name="stats weight"
        type="number"
        value={formData.stats.weight}
        onChange={handleChange}
        placeholder="140"
        required
      />
      <label htmlFor="CBodyFat">Current Body Fat:</label>
      <input
        id="CBodyFat"
        name="stats bodyFat"
        type="number"
        value={formData.stats.bodyFat}
        onChange={handleChange}
        placeholder="15"
        required
      />
      <h3>Goals</h3>
      <label htmlFor="GWeight">Goal Weight:</label>
      <input
        id="GWeight"
        name="goals weight"
        type="number"
        value={formData.goals.weight}
        onChange={handleChange}
        placeholder="140"
        required
      />
      <label htmlFor="GBodyFat">Goal Body Fat:</label>
      <input
        id="GBodyFat"
        name="goals bodyFat"
        type="number"
        value={formData.goals.bodyFat}
        onChange={handleChange}
        placeholder="15"
        required
      />
      <div className="actions-section">
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
          className="delete"
          onClick={() => navigate(-1)}
          type="reset"
          //   type="submit"
        >
          <XMarkIcon width={32} height={32} />
        </button>
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
          className="add"
          type="submit"
        >
          <PlusCircleIcon width={32} height={32} />
        </button>
      </div>
    </form>
  );
};
export default UserAdd;
