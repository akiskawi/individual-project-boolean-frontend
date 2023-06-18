import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const UserView = ({singleUser}) => {
  const { id } = useParams();
  const [user, setUser] = useState(false)
  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

//   if (user) {
//     return <span className="loader"></span>;
//   }
  return <div>UserView</div>;
};
export default UserView;
