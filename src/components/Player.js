import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentTime: 0,
      duration: 0,
      animation: null,
      ended: false
    }

    this.reload = this.reload.bind(this);
    this.play = this.play.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  static getDerivedStateFromProps(prevState, nextProps) {
    console.log(prevState, nextProps);
    return null;
  }

  componentDidMount() {
    this.player = new Audio();
    this.player.onplay = this.onPlay;
    this.player.onpause = this.onPause;
    this.player.onended = this.onStop;
    // this.player.onloadedmetadata = () => URL.revokeObjectURL(this.player.src);
    if (this.props.audioUrl) {
      this.player.src = this.props.audioUrl;
    }
  }

  render() {
    const { playing, currentTime } = this.state;
    return (
      <div onClick={this.play}>
        {
          playing ? "pause" : "play"
        }{currentTime}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('component did update', prevState);
    const { audioUrl: prevAudioUrl } = prevProps;
    const { audioUrl } = this.props;
    if ( prevAudioUrl !== audioUrl ) this.reload(audioUrl);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.animation);
    URL.revokeObjectURL(this.player.src);
  }

  play() {
    if(this.state.playing) return this.player.pause();
    this.player.play();
  }

  onPlay() {
    this.setState({
      playing: true,
      ended: false,
      animation: requestAnimationFrame(this.onPlay),
      currentTime: this.player.currentTime,
    })
  }

  onPause() {
    cancelAnimationFrame(this.state.animation);
    this.setState({
      playing: false,
    })
  }

  onStop() {
    cancelAnimationFrame(this.state.animation);
    this.setState({
      playing: false,
      ended: true,
    })
  }

  reload(audioUrl) {
    URL.revokeObjectURL(this.player.currentSrc);
    this.player.src = audioUrl;
    this.setState({
      playing: false,
      currentTime: 0,
      duration: 0
    })
  }
}

export default Player;