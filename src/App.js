import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { axiosWithAuth } from './axiosAuth'
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import UserGoals from "./components/private/UserGoals";
import PublicGoals from "./components/public/PublicGoals";

function App(props) {
  let [users, setUsers] = useState([])

  useEffect(() => {
    axiosWithAuth()
      .get('https://thirty-before-thirty-bw.herokuapp.com/auth')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  // console.log('app')

  return (
    <div className='App'>
      <h1>30 before 30 Front End</h1>
      <Route exact path='/' render={props => <Login {...props} />} />
      <Route path='/register' render={props => <Register {...props} />} />
      <Route path='/user' render={props => <UserGoals {...props} />} />
      <Route path='/feed' render={props => <PublicGoals {...props} users={users} />} />
    </div>
  );
}

export default App;
