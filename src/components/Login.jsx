import React from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(
        "https://thirty-before-thirty-bw.herokuapp.com/auth/login",
        this.state
      )
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/user");
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    // event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>new to 30 before 30?</p>
        <Link to='/register' >click here</Link>
      </div>
    );
  }
}

export default Login;
