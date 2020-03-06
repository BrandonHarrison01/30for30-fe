import React, { useState } from "react";

import axios from "axios";

function Register() {
  let [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  let [password, setPassword] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state, "inputs");
    if(password['password'] === password['confirmPassword']){
      setCreds({ ['password']: password['password']})
      console.log('creds', creds)
      // axios
      //   .post(
      //     "https://thirty-before-thirty-bw.herokuapp.com/auth/register",
      //     creds
      //   )
      //   .then(res => console.log(res, "results"))
      //   .catch(err => console.log(err));
    };
  }

  // handleInputChange = event => {
  //   // event.preventDefault()
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  return (
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
            setPassword({ ...password, ['password']: e.target.value})
          }
        />
        <label>Confirm Password</label>
        <input
          type='password'
          name='password'
          onChange={e =>
            setPassword({ ...password, ['confirmPassword']: e.target.value})
          }
        />
      </div>
      <button type='submit'>Sign Up</button>
      {/* <button onClick={console.log(password, 'password')}>test console</button> */}
    </form>
  );
}

export default Register