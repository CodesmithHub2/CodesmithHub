import React, { Component } from 'react';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import TextField from './textField.jsx';
import NewsFeed from './newsFeed.jsx';
import Navbar from './navbar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ChatBox from './chat/chatbox.jsx'
import { Redirect } from 'react-router-dom'

/**
 * Main will render the main page when a user logs in
 *  this page should display the profile picture, a data feed, and a navigation bar
 *  the nav bar will toggle between user posts, calendar, and a directory
 *
 * Props: imgURL, selectedPage,
 *
 * profile pic will navigate to personal profile page
 */

class MainPage extends Component {

  state = {
    directory: [],
    selectedPage: 'Login',
    user: {},
    selectedUser: {},
<<<<<<< HEAD
=======
    addFeed: null,
    logout: false,
>>>>>>> acf75495fc5147bdd81027a59f5a4e82b5eea395
  };

  changeView = (buttonName) => {
    console.log(`---> ${buttonName}`);
    this.setState({ selectedPage: buttonName });
  }

  changeTag = (e) => {
    const tag = e.target.innerHTML.split('--')[2].slice(1, -2)
    this.setState({
      selectedPage: tag
    })
    console.log('Current tag swapped to: ', tag)
  }

  /** this updates the directory, the server response from a GET request is passed in */
  updateDirectory = (newDirectory) => {
    this.setState({ directory: newDirectory });
  }

  setID = (userID) => {
    this.setState({ user: userID });
  }

  setUser = (userID) => {
    let userToSet;
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        userToSet = user2;
        console.log('CURRENT USER: ', userToSet);
      }
    }
    this.setState({ user: userToSet });
  }

  updateFeed = (newFeed) => {
    console.log(newFeed)
  }

  viewProfile = (userID) => {
    let selectedUser;
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        selectedUser = user2;
        console.log('SELECTED USER: ', selectedUser);
      }
    }
    selectedUser.username = selectedUser.firstname + ' ' + selectedUser.lastname;
    this.setState({ selectedPage: 'ViewPage', selectedUser: selectedUser });
  }

  componentDidMount() {
    this.setState({ selectedPage: 'Feed', user: this.props.location.state.from });

    axios.get('/user/all')
      .then((response) => {
        this.setState({
          directory: response.data,
        })
        this.updateDirectory(response.data);
        this.setUser(this.state.user);
      })
      .then(res => {
        console.log('LIST OF ALL USERS: ', this.state.directory)
      })
  }

  handleLogOut = () => {
    this.setState({
      logout: true
    })
  }
  /** Render the main page based on 'selectedPage' */
  render() {
    let feed;
    if (this.state.logout) {
      return (
        <Redirect to='/' />
      )
    }
    // DIRECTORY
    if (this.state.selectedPage === 'Directory') {
      feed = (<Directory
        listItems={this.state.directory}
        viewProfile={this.viewProfile}
      />);
    }

    // SEE YOUR PROFILE PAGE
    else if (this.state.selectedPage === 'Profile') {
      feed = (<ProfilePage
        username={this.state.user.username}
        hometown={this.state.user.hometown}
        past={this.state.user.past}
        future={this.state.user.future}
        hobbies={this.state.user.hobbies}
        random={this.state.user.random}
        avatar={this.state.user.avatar}
<<<<<<< HEAD
=======
        edit={this.state.user}
        id={this.state.user.id}
>>>>>>> acf75495fc5147bdd81027a59f5a4e82b5eea395
      />);
    }

    // VIEW A PROFILE PAGE
    else if (this.state.selectedPage === 'ViewPage') {
      feed = (
        <ProfilePage
          username={this.state.selectedUser.username}
          hometown={this.state.selectedUser.hometown}
          past={this.state.selectedUser.past}
          future={this.state.selectedUser.future}
          hobbies={this.state.selectedUser.hobbies}
          random={this.state.selectedUser.random}
          id={this.state.selectedUser.id}
        />
      );
    }
    // NEWS FEED
    else if (this.state.selectedPage === 'Feed') {
      feed = <NewsFeed directory={this.state.directory} />;
    }

    else {
      console.log('ERROR: Shouldn\'t be here');
    }

    return (
<<<<<<< HEAD
      <div>
        <section className="content gradient">
          <div className="container">
              <div className="row">

                <h3 className="text-center">Welcome to Codesmith</h3>
                <div className="line"></div>

                <div className="col-md-4 box-shadow rounded-x2 padd">
                <div className="single_box box-blue style1">
                <img
                  className="image-300"
                  src={this.state.user.avatar}
                  onClick={() => { this.changeView('Profile'); }}
                />
                <TextField userID={this.state.user.id} update={this.updateFeed} />
                </div>
                </div>
                <div className="col-md-6 box-shadow rounded-x2 padd">

                <ChatBox user={this.state.user} />
                </div>
              </div>
            </div>
        </section>
        <section id="service" className="content section-grey">
          <div className="container">
            <div className="row">

              <div className="col-sm-12 col-md-7 box-shadow rounded-x2 padd">
               

                <div className="nav-bar">
                  <MuiThemeProvider>
                    <Navbar action={this.changeTag} />
                  </MuiThemeProvider>
                </div>

                {/* Feed Items */}
                {feed}
               
              </div>
            </div>
=======
      <div className="main-page">
        <h1> MAIN </h1>
        <button type='submit' className='btn btn-primary rounded pi-btn-default margin-right-10' onClick={this.handleLogOut}>Log Out</button>
        <div className="list-group col-sm-2">
          <img
            className="prof-pic"
            src={this.state.user.avatar}
            onClick={() => { this.changeView('Profile'); }}
          />
          <TextField userID={this.state.user.id} update={this.updateFeed}/>
          <ChatBox user={this.state.user}/>
        </div>

        {/* main window */}
        <div className="col-sm-10 col-sm-offset-2">
          {/* nav bar */}
          <div className="nav-bar">
            <MuiThemeProvider>
              <Navbar action={this.changeTag} />
            </MuiThemeProvider>
>>>>>>> acf75495fc5147bdd81027a59f5a4e82b5eea395
          </div>
        </section>
      </div>
    );
  }
}

export default MainPage;

