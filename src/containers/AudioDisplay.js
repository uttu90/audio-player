import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioDisplay extends Component {
  render() {
    const { player, currentTime=0, duration=0, playing } = this.props;
    return (
      <div onClick={this.play.bind(this)}>
        {
          playing ? "Pause" : "Play"
        }
        {
          `${currentTime.toFixed(2)}/${duration.toFixed(2)}`
        }
      </div>
    );
  }

  play() {
    const { player, playing } = this.props;
    if (!player) return ;
    if (playing) return player.pause();
    player.play();
  }
}

function mapStateToProps(state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(AudioDisplay);