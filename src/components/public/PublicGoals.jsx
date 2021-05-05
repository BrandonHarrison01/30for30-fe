import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { axiosWithAuth } from "../../axiosAuth";

import { herokuUrl } from "../../App"

import Goal from "./Goal";
import GoalModal from "./GoalModal";

function PublicGoals(props) {
  let [feed, setFeed] = useState([]);
  let [goalModal, setGoalModal] = useState(false);
  let [postData, setPostData] = useState();
  let [search, setSearch] = useState("");
  let [searchFeed, setSearchFeed] = useState([])
  let [renderSearchFeed, setRenderSearchFeed] = useState(false)
  let userId = {};

  useEffect(() => {
    axiosWithAuth()
      .get(`${herokuUrl}/api/items`)
      .then((res) => setFeed(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    props.history.push("/");
    localStorage.removeItem("token");
  };

  const toggleGoalModal = (post) => {
    setPostData(post);
    setGoalModal(!goalModal);
  };

  const deleteGoal = (id) => {
    axiosWithAuth().delete(
      `${herokuUrl}/api/remove-item/${id}`
    );
  };

  // let searchFeed = [];
  const searchGoal = (s) => {
    setSearchFeed(feed.filter((f) => f.item_name.includes(s)));
    setRenderSearchFeed(true)
    console.log(feed, "search");
  };

  props.users.map((user) => (userId[user.id] = user.username));

  return (
    <div className='publicGoals'>
      <header className='pageHead'>
        <div className='banner'>
          <h2>Public Goals</h2>
          <Link className='navLink' to='/user'>
            My Goals
          </Link>
          <div>
            <h4>{props.currentUser}</h4>
            <Button color='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className='searchBar'>
        <Input placeholder='search public goals...' onChange={e => setSearch(e.target.value)} />
        <div className='searchBtns'>
          <Button color='primary' onClick={() => searchGoal(search)}>
            Search
          </Button>
          <Button color='danger' onClick={() => setRenderSearchFeed(false)}>
            Clear
          </Button>
        </div>
      </div>
      <GoalModal
        goalModal={goalModal}
        toggleGoalModal={toggleGoalModal}
        postData={postData}
        userId={userId}
      />
      <div className='publicFeed'>
        { renderSearchFeed ?
          searchFeed.map((post) => (
            <Goal
              key={post.id}
              userId={userId}
              post={post}
              toggleGoalModal={toggleGoalModal}
              deleteGoal={deleteGoal}
              currentUser={props.currentUser}
            />
          ))
          :
          feed.map((post) => (
            <Goal
              key={post.id}
              userId={userId}
              post={post}
              toggleGoalModal={toggleGoalModal}
              deleteGoal={deleteGoal}
              currentUser={props.currentUser}
            />
        ))}
      </div>
    </div>
  );
}

export default PublicGoals;
