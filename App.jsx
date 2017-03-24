import React from 'react';
import Firebase from './firebase-wrapper'; // Import Firebase library

const App = React.createClass({
  getInitialState() {
    return {
      messages: [], // Initialize empty list of messages
      name: 'Bob'
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

  handleNameChange(event) {
    this.setState({name: event.target.value});
  },

  handleKeyPress(event) {
    const {name} = this.state;
    // If name or newMessage are blank, do not send new message
    if (!name) {
      return;
    }

    // If user hits Enter key, then send message to Firebase database
    // and clear out the message box
    if (event.key === '') {
      // Firebase.sendMessage({name: name, message: newMessage});
    }
  },

  renderMessageDiv(message) {
    return <p> </p>;
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
    // Use this when adding message sending capabilities
    // <div>
    //   <Input label={'Message'} value={newMessage} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
    // </div>
  }
});

export default App;
