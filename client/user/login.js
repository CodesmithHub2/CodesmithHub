import React, { Component } from 'react';
import { render } from 'react-dom';
import SignUp from './signup.js';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import MainPage from './../components/mainPage.jsx';

class LogIn extends React.Component {

  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };
    this.loginInfo = this.loginInfo.bind(this);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{pathname: "/main", state: { from: this.state.user } }} />
      )
    }

    return (

      <div>
        <section id="login" className="content section-grey" >
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-sm-6 col-sm-offset-3">
                <div className="register-box box-shadow rounded-x2">
                  <h5 className="heading heading-v3"><span>Log In Form</span></h5>
            
                    <form className="form-inline" role="form" onSubmit={this.loginInfo}>
                      <div className="form-group margin-right-10">
                        <input type="email" className="form-control" id="loginEmail" placeholder="Email" />
                      </div>
                      <div className="form-group margin-right-10">
                        <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
                      </div>
                                
                      <button type="submit" className="btn btn-primary rounded pi-btn-default btn-xlg margin-right-10">Log In</button>
                      <button className="btn btn-primary rounded pi-btn-dark btn-xlg margin-right-10">
                          <Link to="/signup">Sign Up</Link>
                      </button>
                    </form>	
                </div>
              </div>
            </div>
          </div>
        </section>
=

    </div>
    )
  }

  loginInfo(e) {
    e.preventDefault();

    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    }

    axios.post('/authenticate/validate', data)
    .then((response) => {
      console.log(this);
      if (response.status === 200) {
        this.setState({ loggedIn: true, user: response.data.id });
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }
}

export default LogIn;
