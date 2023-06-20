import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";

const WorkoutView = () => {
  const { userId, id } = useParams();
  const [workout, setWorkout] = useState({
    name: "",
    id: "",
    day: "",
    exercises: [],
  });

  useEffect(() => {
    api
      .get(`users/${userId}/workouts/${id}`)
      .then((res) => setWorkout(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteLink = (exerciseId) => {
    api
      .delete(`users/${userId}/workouts/${id}/exercises/${exerciseId}`)
      .then(
        (res) => {
          setWorkout({
            ...workout,
            exercises: [
              ...workout.exercises.filter((e) => e.id !== res.data.id),
            ],
          });
        }

        // console.log(res.data))
      )
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>{workout.name}</h2>
      <p>{workout.day}</p>
      <ul className="user-list">
        {workout.exercises.map((exercise, index) => {
          return (
            <li className="user" key={index}>
              <p>
                {exercise.name} {exercise.sets}X{exercise.reps}@{exercise.rpe}
              </p>
              <p className="links">
                <Link to={`exercises/${exercise.id}`}>View</Link>
                <Link to={`exercises/edit/${exercise.id}`}>Edit</Link>
                <Link onClick={() => handleDeleteLink(exercise.id)}>
                  Delete
                </Link>
              </p>
            </li>
          );
        })}
        <li className="user">
          <Link to={`exercises/add`}>Add One</Link>
        </li>
      </ul>
    </>
  );
};
export default WorkoutView;
