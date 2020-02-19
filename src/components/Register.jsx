import React from 'react'

import axios from 'axios'

class Register extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state, 'inputs')
        axios
            .post('https://thirty-before-thirty-bw.herokuapp.com/auth/register', this.state)
            .then(res => console.log(res, 'results'))
            .catch(err => console.log(err))
    }
    
    handleInputChange = event => {
        // event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username</label>
              <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
            </div>
            <div>
              <label>Password</label>
              <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
              <label>Confirm Password</label>
              <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        )
    }
}

export default Register