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
  let [newGoalFormModal, setNewGoalFormModal] = useState(0);
  let [error, setError] = useState()

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/user-items")
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
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
        setNewGoalFormModal(0);
      })
      .catch(err => setError(err.response.data));
  };

  const logout = () => {
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

  const toggleModal = () => setNewGoalFormModal(!newGoalFormModal)

  return (
    <div>
      <header className='pageHead'>
        <div>
          <h2>My Goals</h2>
          <Link className='navLink' to='/feed'>See public goals feed</Link>
        </div>
      </header>
      {/* <button onClick={() => setToggleNewGoalForm(1)}>Create New Goal</button> */}
      <Incomplete
        setNewGoalFormModal={setNewGoalFormModal}
        userData={userData}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
      <Complete
        userData={userData}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
      <NewGoalForm
        submitNewGoal={submitNewGoal}
        setNewGoal={setNewGoal}
        newGoal={newGoal}
        newGoalFormModal={newGoalFormModal}
        toggleModal={toggleModal}
        error={error}
      />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserGoals;
