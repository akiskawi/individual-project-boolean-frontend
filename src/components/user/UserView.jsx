import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import WorkoutList from "../workout/WorkoutList";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    stats: { height: "", bodyFat: "", weight: "" },
    goals: { bodyFat: "", weight: "" },
    workouts: [{ day: "", id: "", name: "" }],
  });

  const handleDeleteWorkout = (workoutId) => {
    api
      .delete(`users/${id}/workouts/${workoutId}`)
      .then(() => {
        setUser(
          {
            ...user,
            workouts: [...user.workouts.filter((w) => w.id !== workoutId)],
          }
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleGoalsUpdate = () => {
    const weight = document.querySelector("#weight").textContent;
    const bodyFat = document.querySelector("#bodyFat").textContent;
    api
      .put(`users/${id}/goals`, { weight, bodyFat })
      .catch((err) => console.log(err));
  };

  if (user.id === "") {
    return <span className="loader"></span>;
  }
  return (
    <>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <div>
        <p>Contact: {user.email}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "2em",
          }}
        >
          <div>
            <p>Current Stats</p>
            <ul>
              <li>Height: {user.stats.height}</li>
              <li>Weight: {user.stats.weight}</li>
              <li>Bodyfat: {user.stats.bodyFat}<span>%</span></li>
            </ul>
          </div>
          <div>
            <p>Goal Stats</p>
            <ul>
              <li>
                Weight:{" "}
                <span id="weight" contentEditable>
                  {user.goals.weight}
                </span>
              </li>
              <li>
                Bodyfat:{" "}
                <span id="bodyFat" contentEditable>
                  {user.goals.bodyFat}
                </span>
                <span>%</span>
              </li>
              <li>
                <button onClick={handleGoalsUpdate}>Change Goals</button>
              </li>
            </ul>
          </div>
        </div>
        <>
          <header>
            <h3>Workouts</h3>
          </header>
          <WorkoutList handleDeleteWorkout={handleDeleteWorkout} workouts={user.workouts}/>
        </>
      </div>
    </>
  );
};
export default UserView;
