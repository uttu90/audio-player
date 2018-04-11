const SET_PLAYER = "audio-player/set-player";
const GET_TIME = "audio-player/get-time";
const SET_PLAY = 'audio-player/set-play';
const SET_PAUSE = 'audio-player/set-pause';
const SET_ENDED = 'audio-player/set-ended';
const SET_DURATION = 'audio-player/set-duration';
const RELOAD = 'audio-player/reload';

export function setPlayer(player) {
  return {
    type: SET_PLAYER,
    payload: {
      player
    }
  }
}

export function setTime(time) {
  return {
    type: GET_TIME,
    payload: {
      time
    }
  }
}

export function setPlay() {
  return {
    type: SET_PLAY
  }
}

export function setPause() {
  return {
    type: SET_PAUSE
  }
}

export function setEnded() {
  return {
    type: SET_ENDED
  }
}

export function setDuration(duration) {
  return {
    type: SET_DURATION,
    payload: {
      duration
    }
  }
}

export function reload() {
  return {
    type: RELOAD
  }
}

export default function playerReducer(state={}, action) {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload.player
      }
    case GET_TIME:
      return {
        ...state,
        currentTime: action.payload.time
      }
    case SET_PLAY:
      return {
        ...state,
        playing: true,
        ended: false
      }
    case SET_PAUSE:
      return {
        ...state,
        playing: false
      }
    case SET_ENDED:
      return {
        ...state,
        ended: true,
        playing: false
      }
    case SET_DURATION:
      return {
        ...state,
        duration: action.payload.duration
      }
    case RELOAD:
      return {
        ...state,
        playing: false,
        ended: false,
        currentTime: 0
      }
    default:
      return state;
  }
}