import { useState } from "react";
import api from '../../api'
import { useNavigate, useParams }
 from "react-router-dom";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";


const ExerciseAdd = () => {
   const navigate =  useNavigate();
   const {userId,id} =  useParams()
  const [formData, setFormData] = useState({
    name: "",
    rpe: "",
    sets: "",
    reps: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const postData = () => {
    api
      .post(`users/${userId}/workouts/${id}/exercises`,formData)
      .then(navigate(`/users/${userId}/workouts/${id}`));
}
  return (
    <form className="form-stack user-form" onSubmit={handleSubmit}>
      <h2>Create Exercise</h2>
      <label htmlFor="name">Exercise Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Deadlift"
        required
      />
      <label htmlFor="sets">Sets:</label>
      <input
        id="sets"
        name="sets"
        type="number"
        value={formData.sets}
        onChange={handleChange}
        placeholder="3"
        required
      />
      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        name="reps"
        type="number"
        value={formData.reps}
        onChange={handleChange}
        placeholder="3"
        required
      />
      <label htmlFor="rpe">Rpe:</label>
      <input
        id="rpe"
        name="rpe"
        type="number"
        value={formData.rpe}
        onChange={handleChange}
        placeholder="3"
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
export default ExerciseAdd;
