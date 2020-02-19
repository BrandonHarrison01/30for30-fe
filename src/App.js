import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";

function App(props) {
  return (
    <div className='App'>
      <h1>30for30 Front End</h1>
      <Route path='/login' render={props => <Login {...props} />} />
      <Route path='/register' component={Register} />
      <Route path='/user' component={User} />
    </div>
  );
}

export default App;
