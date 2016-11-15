import React from 'react';
import Firebase from './firebase-wrapper'; // Import Firebase library
import Message from './components/Message.jsx';
import Input from './components/Input.jsx';

const App = React.createClass({
  getInitialState() {
    return {
      messages: [], // Initialize empty list of messages
      name: 'Bob',
      newMessage: ''
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

  handleMessageChange(event) {
    this.setState({newMessage: event.target.value});
  },

  handleKeyPress(event) {
    const {name, newMessage} = this.state;
    // If name or newMessage are blank, do not send new message
    if (!name || !newMessage) {
      return;
    }

    // If user hits Enter key, then send message to Firebase database
    // and clear out the message box
    if (event.key === 'Enter') {
      Firebase.sendMessage({ name: name, message: newMessage });
      this.setState({newMessage: ''});
    }
  },

  renderMessageDiv(message) {
    return <Message key={message.key} message={message}/>;
  },

  render() {
    // Iterates through the messages in state to create HTML elements
    // for each message
    const messageDivs = this.state.messages.map(this.renderMessageDiv);

    const {newMessage, name} = this.state;

    return (
      <div>
        <h2>ChatMe</h2>
        <div>
          {messageDivs}
        </div>
        <div>
          <Input label={'Message'} value={newMessage} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} />
          <Input label={'Name'} value={name} onChange={this.handleNameChange} />
        </div>
      </div>
    );
  }
});

export default App;
