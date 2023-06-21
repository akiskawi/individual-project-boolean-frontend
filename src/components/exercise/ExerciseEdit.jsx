import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ExerciseEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rpe: "",
    sets: "",
    reps: "",
  });
  const { userId, workoutId, exerciseId } = useParams();

  useEffect(() => {
    api
      .get(`users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const postData = () => {
    api
      .put(
        `users/${userId}/workouts/${workoutId}/exercises/${exerciseId}`,
        formData
      )
      .then(navigate(`/users/${userId}/workouts/${workoutId}`));
  };

  return (
    <form className="form-stack user-form" onSubmit={handleSubmit}>
      <h2>Edit Exercise</h2>
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
          className="button blue delete"
          onClick={() => navigate(-1)}
          type="reset"
          //   type="submit"
        >
          <XMarkIcon width={32} height={32} />
        </button>
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
          className="button blue edit"
          type="submit"
        >
          <PencilSquareIcon width={32} height={32} />
        </button>
      </div>
    </form>
  );
};
export default ExerciseEdit;
