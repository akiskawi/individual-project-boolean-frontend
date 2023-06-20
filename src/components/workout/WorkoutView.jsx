import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PencilSquareIcon, TrashIcon,PlusIcon } from "@heroicons/react/24/outline";

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
      .get(`users/${userId}/workouts/${id}/all`)
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
                <Link className="edit" to={`exercises/edit/${exercise.id}`}>
                  <PencilSquareIcon width={24} height={24} />
                </Link>
                <Link
                  className="delete"
                  onClick={() => handleDeleteLink(exercise.id)}
                >
                  <TrashIcon width={24} height={24} />
                </Link>
              </p>
            </li>
          );
        })}
        <li className="user">
          <Link className="add" to={`exercises/add`}>
            <PlusIcon width={24} height={24} />
          </Link>
        </li>
      </ul>
    </>
  );
};
export default WorkoutView;
