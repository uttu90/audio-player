import React from 'react';
import { connect } from 'react-redux';

function SimpleControl(props) {
  const { playing = false, player } = props;
  return (
    <button onClick={() => {playing ? player.pause() : player.play()}}>
      { playing ? "Pause" : "Play" }
    </button>
  )
}

function mapStateToProps(state) {
  const { playing, player } = state.player
  return {
    playing,
    player
  }
}

export default connect(mapStateToProps)(SimpleControl);