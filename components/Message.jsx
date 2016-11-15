import React from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'node-emoji';

class Message extends React.Component {
  // Setting propTypes ensure that your component is used correctly
  static propTypes = {
    message: PropTypes.object
  }

  render() {
    // Destructuring pulls the different fields from
    // the message object
    const {name, message} = this.props.message;

    const emojifiedString = emojify(message);

    return <p>{name}: {emojifiedString}</p>;
  }
}

export default Message;
