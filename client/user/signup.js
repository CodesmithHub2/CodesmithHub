import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class SignUp extends React.Component {

  state = {
    loggedIn: false,
    user: {},
    avatar: 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png',
    imgLink: '',
  }

  handleAvatar = (e) => {
    this.setState({
      avatar: e.target.src
    })
  }

  handleChange = (e) => {
    this.setState({
      imgLink: e.target.value
    })
  }

  submitAvatar = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        avatar: this.state.imgLink
      })
    }
  }

  userInfo = (e) => {
    e.preventDefault()
    
    const data = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      hometown: document.getElementById('hometown').value,
      past: document.getElementById('past').value,
      future: document.getElementById('future').value,
      hobbies: document.getElementById('hobbies').value,
      random: document.getElementById('random').value,
      avatar: this.state.avatar
    }

    axios.post('/authenticate/create', data)
    .then((response) => {
      if (response.status === 200) {
        this.setState({ loggedIn: true, user: response.data.id });
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{ pathname: "/main", state: { from: this.state.user } }} />
      )
    }

    return (

      <div>
        <section id="register" className="content section-grey" >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
                <div className="register-box box-shadow rounded-x2">
                  <h4 className="text-center weight-700">Sign Up</h4>
                    <hr />

                  <form role="form" onSubmit={this.userInfo}>
                    <div className="input-group margin-right-20">
                      <label for="firstname">First Name</label>
                      <input type="text" className="form-control" id="firstname" name="First Name" placeholder="First Name" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label for="lastname">Last name</label>
                      <input type="text" className="form-control" id="lastname" name="Last Name" placeholder="Last Name" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label for="email">Email Address</label>
                      <input type="text" className="form-control" id="email" name="Email" placeholder="Email" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label for="password">Email Address</label>
                      <input type="password" className="form-control" id="password" name="Password" placeholder="Password" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label for="hometown">Where do you consider yourself from?</label>
                      <input type="textarea" className="form-control" id="hometown" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label for="past">What were you doing before Codesmith?</label>
                      <input type="textarea" className="form-control" id="past" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label for="future">What do you want to do with your coding skills?</label>
                      <input type="textarea" className="form-control" id="future" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label for="hobbies">What are your passions and hobbies?</label>
                      <input type="textarea" className="form-control" id="hobbies" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label for="random">What is a fun or random fact about yourself?</label>
                      <input type="textarea" className="form-control" id="random" />
                    </div>

                    <div className="input-group">
                        <label>Choose an AVATAR or add image address:
                          <input type='text' value={this.state.imgLink} onChange={this.handleChange} onKeyPress={this.submitAvatar} />
                        </label>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/01.png' style={{ width: 40, height: 40, marginRight: 15 }} className='a' onClick={this.handleAvatar} />
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/02.png' style={{ width: 40, height: 40, marginRight: 15 }} className='b' onClick={this.handleAvatar} />
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/03.png' style={{ width: 40, height: 40, marginRight: 15 }} className='c' onClick={this.handleAvatar} />
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/05.png' style={{ width: 40, height: 40, marginRight: 15 }} className='d' onClick={this.handleAvatar} />
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/06.png' style={{ width: 40, height: 40, marginRight: 15 }} className='e' onClick={this.handleAvatar} />
                      </div>
                      <p>Image Preview: </p>
                      <img src={this.state.avatar} style={{ height: 60, width: 60 }} className='img-preview' />
                    <div className="padded">&nbsp;</div>
                    <button type="submit" className="btn btn-primary rounded pi-btn-default btn-xlg">Create An Account</button>
                    <button className="btn btn-primary rounded pi-btn-dark btn-xlg">
                      Already have an account? <Link to="/">Log In</Link>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default SignUp;
