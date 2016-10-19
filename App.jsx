import React from 'react';
import * as firebase from 'firebase'; // Import Firebase library

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
      messages: [] // Initialize empty list of messages
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

  renderMessageDiv(message) {
    return <p key={message.key}>{message.name}: {message.message}</p>;
  },

  render() {
    // Iterates through the messages in state to create HTML elements
    // for each message
    const messageDivs = this.state.messages.map(this.renderMessageDiv);

    return (
      <div>
        <h2>ChatMe</h2>
        <div>
          {messageDivs}
        </div>
      </div>
    );
  }
});

export default App;
