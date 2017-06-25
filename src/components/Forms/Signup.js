import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import FormInput from './FormInput';

class Signup extends Component {
  state = {}

  handleSignup = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({error: ''});

    const userData = {
      username: username,
      password: password
    };

    axios.post('http://localhost:8008/signup', userData)
      .then(res => {
        const status = res.data.success;
        if(!status) {
          this.setState({error : res.data.message});
        } else {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  attrChangeUn = (username) => {
    this.setState({username});
  }

  attrChangePwd = (password) => {
    this.setState({password});
  }

  componentDidMount = () => {
    this.FormInput.focus();
  }

  render() {
    const { error, username, password } = this.state;
    return(
      <div class='signup'>
        <div class='popup'>
          <div class='header'>Create Account</div>
          <div class='content'>
            <form action="http://localhost:8008/signup" method="post" id='signup-form'>

              <FormInput
                type='text'
                name='username'
                ref={comp => {this.FormInput = comp;}}
                onChange={ this.attrChangeUn }
                 />

              <FormInput
                type='password'
                name='password'
                onChange={ this.attrChangePwd }
                />

              <p class='error-msg'>{error}</p>

              <input
                type='submit'
                value='Signup'
                class='btn btn-form'
                disabled={!(username && password)}
                onClick={this.handleSignup}
                />

              <p>Have an account? <Link to="/login">Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(Signup);
