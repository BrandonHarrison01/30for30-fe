import React, { useState } from "react";

import axios from "axios";

function Register(props) {
  let [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [error, setError] = useState()

  const handleSubmit = event => {
    event.preventDefault();
    if(password === confirmPassword){
      creds.password = password
      axios
        .post(
            "https://thirty-before-thirty-bw.herokuapp.com/auth/register",
            creds
          )
          .then(res => {
            console.log(res, 'res')
            localStorage.setItem('token', res.data.token);
            props.history.push('/')
          })
          .catch(err => setError(err.response.data));
    };
  }

  return (
    <div>
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type='text'
            name='username'
            onChange={e =>
              setCreds({ ...creds, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={e =>
              setPassword(e.target.value)
            }
          />
          <label>Confirm Password</label>
          <input
            type='password'
            name='password'
            onChange={e =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default Register