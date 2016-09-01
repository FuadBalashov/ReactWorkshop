import React from 'react';

const Input = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onKeyPress: React.PropTypes.func
  },

  render() {
    const {label, value, onChange, onKeyPress} = this.props;
    // We can now pass in event handlers to allow users to
    // interact with this component
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
});

export default Input;
