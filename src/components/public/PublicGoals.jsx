import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap'
import { axiosWithAuth } from "../../axiosAuth";

import Goal from "./Goal";
import GoalModal from './GoalModal'

function PublicGoals(props) {
  let [feed, setFeed] = useState([]);
  let [goalModal, setGoalModal] = useState(false)
  let [postData, setPostData] = useState()
  let userId = {};

  useEffect(() => {
    axiosWithAuth()
      .get("https://thirty-before-thirty-bw.herokuapp.com/api/items")
      .then((res) => setFeed(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    props.history.push("/");
    localStorage.removeItem("token");
  };

  const toggleGoalModal = (post) => {
    setPostData(post)
    setGoalModal(!goalModal)
  }

  props.users.map((user) => (userId[user.id] = user.username));

  return (
    <div className='publicGoals'>
      <header className='pageHead'>
        <div className='banner'>
          <h2>Public Goals</h2>
          <Link className='navLink' to='/user'>My Goals</Link>
          <div>
            <h4>{props.currentUser}</h4>
            <Button color='secondary' onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>
      <GoalModal goalModal={goalModal} toggleGoalModal={toggleGoalModal} postData={postData} userId={userId} />
      <div className='publicFeed'>
        {feed.map((post) => (
          <Goal key={post.id} userId={userId} post={post} toggleGoalModal={toggleGoalModal} />
        ))}
      </div>
    </div>
  );
}

export default PublicGoals;
