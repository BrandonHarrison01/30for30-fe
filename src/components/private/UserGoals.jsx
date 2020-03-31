import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../axiosAuth";

import NewGoalForm from "./NewGoalForm";
import Incomplete from "./Incomplete";
import Complete from "./Complete";

function UserGoals(props) {
  let [newGoal, setNewGoal] = useState({
    item_name: "",
    description: "",
    category_id: 0,
    privacy: 1,
    target_date: ""
  });
  let [userData, setUserData] = useState([]);
  let [response, setResponse] = useState(0);
  let [isDeleted, setIsDeleted] = useState(0);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/user-items")
      .then(res => {
        setUserData(res.data)
        console.log(res)
      })
      .catch(err => console.log(err));
    console.log(`response: ${response}, isDeleted: ${isDeleted}`);
  }, [response, isDeleted]);

  const submitNewGoal = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://thirty-before-thirty-bw.herokuapp.com/api/items", newGoal)
      .then(res => {
        setResponse(response + 1)
        console.log(res)
      })
      .catch(err => console.log(err));
    setNewGoal({
      item_name: "",
      description: "",
      target_date: ""
    });
  };

  const logout = () => {
    console.log("logging out");
    props.history.push("/");
    localStorage.removeItem("token");
  };

  const handleDelete = id => {
    axiosWithAuth()
      .delete(
        `https://thirty-before-thirty-bw.herokuapp.com/api/remove-item/${id}`
      )
      .then(res => setIsDeleted(isDeleted + 1))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Personal Goals</h1>
      <Link to='/feed'>Public Goals</Link>
      <Incomplete userData={userData} handleDelete={handleDelete} />
      <Complete userData={userData} handleDelete={handleDelete} />
      <NewGoalForm
        submitNewGoal={submitNewGoal}
        setNewGoal={setNewGoal}
        newGoal={newGoal}
      />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserGoals;
