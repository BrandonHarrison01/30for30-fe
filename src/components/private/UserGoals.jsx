import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../axiosAuth";

import NewGoalForm from "./NewGoalForm";

import Goal from "./Goal";

function UserGoals(props) {
  let [newGoal, setNewGoal] = useState({
    item_name: "",
    description: "",
    category_id: 0,
    privacy: 1,
    target_date: ""
  });

  let [userData, setUserData] = useState([]);
  let [toggle, setToggle] = useState(0);

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/user-items")
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
    setNewGoal({
      ['item_name']: '',
      ['description']: '',
      ['target_date']: '',
    })
  }, [toggle]);

  const submitNewGoal = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://thirty-before-thirty-bw.herokuapp.com/api/items", newGoal)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setToggle(toggle === 0 ? 1 : 0);
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
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setToggle(toggle === 0 ? 1 : 0);
  };

  return (
    <div>
      <h1>Personal Goals</h1>
      <Link to='/feed'>Public Goals</Link>
      {userData.map(card => (
        <Goal card={card} key={card.id} handleDelete={handleDelete} />
      ))}
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
