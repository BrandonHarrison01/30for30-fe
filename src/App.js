import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { axiosWithAuth } from './axiosAuth'

import Login from "./components/Login";
import Register from "./components/Register";
import UserGoals from "./components/private/UserGoals";
import PublicGoals from "./components/public/PublicGoals";

export const herokuUrl = "https://be-bucket-list.herokuapp.com"

function App(props) {
  let [users, setUsers] = useState([])
  let [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    axiosWithAuth()
      .get(`${herokuUrl}/auth`)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='App'>
      <h1>Bucket List Tracker</h1>
      <Route exact path='/' render={props => <Login {...props} setCurrentUser={setCurrentUser} />} />
      <Route path='/register' render={props => <Register {...props} />} />
      <Route path='/user' render={props => <UserGoals {...props} currentUser={currentUser} />} />
      <Route path='/feed' render={props => <PublicGoals {...props} users={users} currentUser={currentUser}/>} />
    </div>
  );
}

export default App;
