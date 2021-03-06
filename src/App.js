import React, { Component } from 'react';
import InputSource from './components/InputSource';
import AudioPlayer from './components/AudioPlayer';
import Player from './containers/Player';
import AudioDisplay from './containers/AudioDisplay';

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
        <AudioPlayer src={this.state.audioUrl}/>
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
