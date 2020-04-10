import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

function Login(props) {
  let [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  let [error, setError] = useState()

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "https://thirty-before-thirty-bw.herokuapp.com/auth/login",
        creds
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        props.history.push("/user");
      })
      .catch(err => setError(err.response.data, 'status'));
  };

    return (
      <div className='loginContainer'>
        { error && <p className='error'>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              type='text'
              name='username'
              onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type='password'
              name='password'
              onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <span>new to 30 before 30? </span>
        <Link to='/register' >register</Link>
      </div>
    );
}

export default Login;
