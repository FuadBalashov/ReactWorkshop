import React from 'react';
import * as firebase from 'firebase'; // Import Firebase library
import Message from './components/Message.jsx';
import Input from './components/Input.jsx';

// Data to authenticate Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDzTLJhoMxTNBADq2AOB83rclB2KIrRcEU',
  authDomain: 'chatbox-6e584.firebaseapp.com',
  databaseURL: 'https://chatbox-6e584.firebaseio.com',
  storageBucket: 'chatbox-6e584.appspot.com'
};
// Initializing Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = React.createClass({
  getInitialState() {
    return {
      messages: [], // Initialize empty list of messages
      name: 'Bob',
      newMessage: ''
    };
  },

  componentWillMount() {
    // gets reference to Firebase database and listens for changes
    this.messagesRef = firebaseApp.database().ref('messages');
    this.listenForItems(this.messagesRef);
  },

  componentWillUnmount() {
    this.messagesRef.off();
  },

  listenForItems(messagesRef) {
    // When database value changes, we take the snapshot and iterate
    // through each item in the snapshot, and create an array of
    // newMessages
    messagesRef.on('value', (snapshot) => {
      // get children as an array
      var newMessages = [];
      snapshot.forEach((child) => {
        newMessages.push({
          name: child.val().name,
          message: child.val().message,
          key: child.key
        });
      });

      // Update the message list in state, triggering a re-render
      this.setState({
        messages: newMessages
      });
    });
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
      this.messagesRef.push({ name: name, message: newMessage });
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
