import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
/**
 * TextField -> when submitted, this should POST a message to the DB
 * and the update should show up in the news feed
 *
 */
class TextField extends Component {

  state = {
    authExpired: false
  }

  newsPost = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const data = {
        user_id: this.props.userID,
        post: document.getElementById('text-field').value,
      };
      console.log(`Posting the following: ${data.user_id}  ${data.post}`);

      axios.post('/user/addpost', data)
      .then((response) => {
        if (!response.data) {
          this.setState({
            authExpired: true
          })
        } else {
          console.log('THIS IS RESPONSE FROM ADDED DATA: *textField line30* ', response.data);
          this.props.update(response.data)
        }
      })
    }
  }

  render() {
    if (this.state.authExpired) {
      alert('User session expired..please login again')
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className="text-field">
        <input
          id="text-field"
          type="text"
          placeholder="Status.."
          onKeyUp={(event) => { this.newsPost(event); }}
        />
      </div>
    );
  }


}

export default TextField;
