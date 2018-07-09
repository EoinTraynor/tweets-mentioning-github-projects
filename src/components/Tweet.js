import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tweet extends Component {
  render() {
    const { tweet } = this.props;
    const capFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
      <div>
        <li className="list-group-item">
          <div className="tweet-header">
            {/*
              <img
                className="card-img img-tumbnail float-left"
                src={tweet.user.profile_image_url}
                alt="Avatar Img" />
            */}
            <h4>{tweet.user.name}</h4>
          </div>
          <div className="tweet-body">
            <p>{tweet.text}</p>
          </div>
        </li>
      </div>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
