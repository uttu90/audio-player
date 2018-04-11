import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setPlayer, setTime,  setPlay, setPause, setEnded, setDuration, reload } from '../reducers/player';

class Player extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      animation: null,
      durationPoll: null
    }

    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.player = new Audio();
    this.player.onplay = this.onPlay;
    this.player.onpause = this.onPause;
    this.player.onended = this.onEnded;
    if (this.props.audioUrl) {
      this.player.src = this.props.audioUrl;
      this.setState({
        durationPoll: setInterval(this.getDuration, 100)
      })
    }
    this.props.setPlayer(this.player);
  }

  render() {
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { audioUrl: prevAudioUrl } = prevProps;
    const { audioUrl } = this.props;
    if ( prevAudioUrl !== audioUrl ) {
      this.player.src = audioUrl;
      this.reload();
    };
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.player.src);
    this.stopAnimation();
  }
  
  getCurrentTime() {
    this.setState({
      animation: requestAnimationFrame(this.getCurrentTime),
    });
    this.props.setTime(this.player.currentTime);
  }

  getDuration() {
    const duration = this.player.duration;
    if (isFinite(duration)) {
      this.props.setDuration(duration);
      clearInterval(this.state.durationPoll);
    }
  }

  onPlay() {
    this.props.setPlay();
    this.getCurrentTime();
  }

  onPause() {
    this.props.setPause();
    this.stopAnimation();
  }

  onEnded() {
    this.props.setEnded();
    this.stopAnimation();
  }

  reload() {
    this.setState({
      durationPoll: setInterval(this.getDuration, 100)
    })
    this.props.reload();
  }

  stopAnimation() {
    cancelAnimationFrame(this.state.animation)
  }
}

function getDispatchToProps(dispatch) {
  return {
    setPlayer: compose(dispatch, setPlayer),
    setPlay: compose(dispatch, setPlay),
    setPause: compose(dispatch, setPause),
    setDuration: compose(dispatch, setDuration),
    setTime: compose(dispatch, setTime),
    reload: compose(dispatch, reload)
  }
}

export default connect(undefined, getDispatchToProps)(Player);