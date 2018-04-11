import React, { Component } from 'react';

class InputSource extends Component {
  constructor(props) {
    super(props);

    this._id = `audio-input${Date.now()}`;
  }

  render() {
    const labelText = this.props.audioUrl || "Browse file";
    return (
      <div>
        <input type="file" accept="audio/*" onChange={this.props.onChange} id={this._id} />
        <label htmlFor={this._id}>{ labelText }</label>
      </div>
    );
  }
}

export default InputSource;