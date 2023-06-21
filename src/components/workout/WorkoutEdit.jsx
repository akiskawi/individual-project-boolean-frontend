import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../api";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

const options = [
  { value: "0", label: "Monday" },
  { value: "1", label: "Tuesday" },
  { value: "2", label: "Wednesday" },
  { value: "3", label: "Thursday" },
  { value: "4", label: "Friday" },
  { value: "5", label: "Saturday" },
  { value: "6", label: "Sunday" },
];
const WorkoutEdit = () => {
  const navigate = useNavigate();
  const { userId, workoutId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    day: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    postData();
  };
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
    if (e.target !== undefined) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, ["day"]: e.value });
    }
  };
  useEffect(() => {
    api
      .get(`users/${userId}/workouts/${workoutId}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const postData = () => {
    api
      .put(`users/${userId}/workouts/${workoutId}`, formData)
      //   .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(navigate(`/users/${userId}`));
  };

  return (
    <form className="form-stack user-form" onSubmit={handleSubmit}>
      <h2>Edit Workout</h2>
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
          className="edit"
          type="submit"
        >
          <PencilSquareIcon width={32} height={32} />
        </button>
      </div>
    </form>
  );
};
export default WorkoutEdit;
