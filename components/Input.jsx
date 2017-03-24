import React from 'react';

const Input = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onKeyPress: React.PropTypes.func
  },

  render() {
    // We can now pass in event handlers to allow users to
    // interact with this component
    return (
      <div>
        <label >{}</label>
        <input
        />
      </div>
    );
  }
});

export default Input;
