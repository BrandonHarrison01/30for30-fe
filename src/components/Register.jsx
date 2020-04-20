import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import axios from "axios";

function Register(props) {
  let [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [passwordError, setPasswordError] = useState();
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
    } else {
      setPasswordError(1)
    };
  }

  return (
    <div className='loginContainer'>
      <h2>Register</h2>
      {error && <p className='error'>{error.message}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for='username' sm={4}>Username:</Label>
          <Col sm={8}>
            <Input
              id='username'
              type='text'
              name='username'
              onChange={e =>
                setCreds({ ...creds, [e.target.name]: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        { passwordError && <p className='error'>Passwords don't match</p> }
        <FormGroup row>
          <Label for='password' sm={4}>Password:</Label>
          <Col sm={8}>
            <Input
              id='password'
              type='password'
              name='password'
              onChange={e =>
                setPassword(e.target.value)
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='confirmPassword' sm={4}>Confirm Password:</Label>
          <Col sm={8}>
            <Input
              id='confirmPassword'
              type='password'
              name='password'
              onChange={e =>
                setConfirmPassword(e.target.value)
              }
            />
          </Col>
        </FormGroup>
        <Button className='registerBtn'>Sign Up!</Button>
      </Form>
      <span>already have an account? </span>
        <Link to='/'>login</Link>
    </div>
  );
}

export default Register