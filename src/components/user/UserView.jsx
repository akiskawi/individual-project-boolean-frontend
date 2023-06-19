import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    stats: { height: "", bodyFat: "", weight: "" },
    goals: { bodyFat: "", weight: "" },
  });
  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

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
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",marginTop:"2em"}}>
          <div>
            <p>Current Stats</p>
            <ul>
              <li>Height: {user.stats.height}</li>
              <li>Weight: {user.stats.weight}</li>
              <li>Bodyfat: {user.stats.bodyFat}</li>
            </ul>
          </div>
          <div>
            <p>Goal Stats</p>
            <ul>
              <li>Weight: {user.goals.weight}</li>
              <li>Bodyfat: {user.goals.bodyFat}</li>
            </ul>
          </div>
        </div>
        <p>Hello Workouts here</p>
      </div>
    </>
  );
};
export default UserView;
