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
        <li className="list-group-item">{tweet.text}</li>
      </div>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
