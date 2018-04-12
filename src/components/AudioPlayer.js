import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Player from '../containers/Player';
import AudioApp from '../containers/AudioApp';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer);
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Player audioUrl={this.props.src} />
          <AudioApp />
        </div>
      </Provider>
    );
  }
}

export default AudioPlayer;