import React from 'react';
import { connect } from 'react-redux';

function SamplePlugin(props) {
  const { player, currentTime=0, duration=0, playing=false } = props;
  return (
    <div onClick={() => playing ? player.pause(): player.play()}>{`${currentTime.toFixed(2)}:${duration.toFixed(2)}`}</div>
  )
}

function mapStateToProps(state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(SamplePlugin);