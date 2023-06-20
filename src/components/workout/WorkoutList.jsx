/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { PencilSquareIcon,TrashIcon,EyeIcon,PlusIcon } from "@heroicons/react/24/outline";

const WorkoutList = ({ workouts, handleDeleteWorkout }) => {
  return (
    <ul className="user-list">
      {workouts.map((workout, index) => {
        return (
          <li className="user" key={index}>
            <p>
              {workout.name} {workout.day}
            </p>
            <p className="links">
              <Link className="view" to={`workouts/${workout.id}`}>
                <EyeIcon width={24} height={24} />
              </Link>
              <Link className="edit" to={`workouts/edit/${workout.id}`}>
                <PencilSquareIcon width={24} height={24} />
              </Link>
              <Link className="delete" onClick={() => handleDeleteWorkout(workout.id)}>
                <TrashIcon width={24} height={24} />
              </Link>
            </p>
          </li>
        );
      })}
      <li className="user">
        <Link className="add" to={`workouts/add`}>
          <PlusIcon width={24} height={24} />
        </Link>
      </li>
    </ul>
  );
};
export default WorkoutList;
