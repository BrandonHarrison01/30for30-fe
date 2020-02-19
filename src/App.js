import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <h1>30for30 Front End</h1>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  );
}

export default App;
