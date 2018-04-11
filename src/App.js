import React, { Component } from 'react';
import InputSource from './components/InputSource';
import Player from './components/Player';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      audioUrl: ''
    }

    this.onSelect = this.onSelect.bind(this);
  }

  render() {
    return (
      <div>
        <InputSource onChange={this.onSelect} />
        <Player audioUrl={this.state.audioUrl} />
      </div>
    );
  }

  onSelect(e) {
    this.setState({
      audioUrl: URL.createObjectURL(e.target.files[0])
    })
  }
}

export default App;
