import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

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
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for='username' sm={2}>Username: </Label>
            <Col sm={10}>
              <Input
                id='username'
                type='text'
                name='username'
                onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='password' sm ={2}>Password: </Label>
            <Col sm={10}>
              <Input
                id='password'
                type='password'
                name='password'
                onChange={e => setCreds({...creds, [e.target.name]: e.target.value})}
              />
            </Col>
          </FormGroup>
          <Button>Sign In</Button>
        </Form>
        <span>new to 30 before 30? </span>
        <Link to='/register' >register</Link>
      </div>
    );
}

export default Login;
