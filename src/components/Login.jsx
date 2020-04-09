import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import styled from 'styled-components'

const LoginCard = styled.div`
  border: 2px solid black;
  padding: 100px;
  text-align: center;
`

const UserPassContainer = styled.div`
  margin-bottom: 20px;
`

const UserPassInput = styled.input`
  border: .5px solid black;
  border-radius: 20px;
  padding: 5px;
`

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
      <LoginCard>
        { error && <p>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <UserPassContainer>
            <label>Username: </label>
            <UserPassInput
              type='text'
              name='username'
              onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
            />
          </UserPassContainer>
          <UserPassContainer>
            <label>Password: </label>
            <UserPassInput
              type='password'
              name='password'
              onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
            />
          </UserPassContainer>
          <button type='submit'>Sign In</button>
        </form>
        <p>new to 30 before 30?</p>
        <Link to='/register' >register</Link>
      </LoginCard>
    );
}

export default Login;
