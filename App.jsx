import React from 'react';
import Firebase from './firebase-wrapper'; // Import Firebase library

const App = React.createClass({
  getInitialState() {
    return {
      messages: [] // Initialize empty list of messages
    };
  },

  componentWillMount() {
    Firebase.turnOn(newState => {
      this.setState(newState);
    });
  },

  componentWillUnmount() {
    Firebase.turnOff();
  },

  renderMessageDiv(message) {
    return <p />;
  },

  render() {
    // Iterates through the messages in state to create HTML elements
    // for each message
    const messageDivs = this.state.messages.map(this.renderMessageDiv);

    return (
      <div>
        <h2>ChatMe</h2>
      </div>
    );
  }
});

export default App;
