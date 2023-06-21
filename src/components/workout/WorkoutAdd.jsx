import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../api";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const options = [
  { value: "0", label: "Monday" },
  { value: "1", label: "Tuesday" },
  { value: "2", label: "Wednesday" },
  { value: "3", label: "Thursday" },
  { value: "4", label: "Friday" },
  { value: "5", label: "Saturday" },
  { value: "6", label: "Sunday" },
];

const WorkoutAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    day: "",
  });
  const handleChange = (e) => {
    // if (e.target.type === "text") {
    // }
    if (e.target !== undefined) {
      if (/\d/.test(e.nativeEvent.data)) {
        e.target.classList.add("wrong");
        setTimeout(function () {
          e.target.classList.remove("wrong");
        }, 300);
        return;
      } else {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, ["day"]: e.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(formData);
    postData();
  };
  const postData = () => {
    api
      .post(`users/${id}/workouts`, formData)
      // .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(navigate(`/users/${id}`));
  };

  return (
    <form className="form-stack user-form" onSubmit={handleSubmit}>
      <h2>Create Workout</h2>
      <label htmlFor="name">Workout Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Chest 'n Back"
        required
      />
      <label htmlFor="day">Day of the Week:</label>
      <Select
        name="day"
        defaultValue={formData.day}
        // value={formData.day}
        onChange={handleChange}
        required
        id="day"
        options={options}
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
export default WorkoutAdd;
