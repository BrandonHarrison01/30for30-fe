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
  let [toggleNewGoalForm, setToggleNewGoalForm] = useState(0);
  let [error, setError] = useState()

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/user-items")
      .then(res => {
        setUserData(res.data);
        console.log(res);
      })
      .catch(err => console.log(err));
    console.log(`response: ${response}, isDeleted: ${isDeleted}`);
  }, [response, isDeleted]);

  const submitNewGoal = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://thirty-before-thirty-bw.herokuapp.com/api/items", newGoal)
      .then(res => {
        setResponse(response + 1);
        console.log(res);
        setNewGoal({
          item_name: "",
          description: "",
          target_date: ""
        });
        setToggleNewGoalForm(0);
      })
      .catch(err => setError(err.response.data));
  };

  const logout = () => {
    console.log("logging out");
    props.history.push("/");
    localStorage.removeItem("token");
  };

  const handleDelete = id => {
    // e.preventDefault();
    axiosWithAuth()
      .delete(
        `https://thirty-before-thirty-bw.herokuapp.com/api/remove-item/${id}`
      )
      .then(res => setIsDeleted(isDeleted + 1))
      .catch(err => console.log(err));
  };

  const toggleComplete = (card, x) => {
    console.log(card, "user goals");
    axiosWithAuth()
      .put(
        `https://thirty-before-thirty-bw.herokuapp.com/api/update-item/${card.id}`,
        {
          item_name: card.item_name,
          category_id: card.category_id,
          complete: x
        }
      )
      .then(res => setResponse(response + 1))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Personal Goals</h1>
      <Link to='/feed'>Public Goals</Link>
      <Incomplete
        userData={userData}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
      <Complete
        userData={userData}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
      {toggleNewGoalForm ? (
        <NewGoalForm
          submitNewGoal={submitNewGoal}
          setNewGoal={setNewGoal}
          newGoal={newGoal}
          setToggleNewGoalForm={setToggleNewGoalForm}
          error={error}
        />
      ) : (
        <button onClick={() => setToggleNewGoalForm(1)}>Create New Goal</button>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserGoals;
