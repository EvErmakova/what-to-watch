import React, {createRef, PureComponent} from "react";
import {history} from "../../utils/history";
import PropTypes from "prop-types";
import {getPosition, getTimeElapsed} from "../../utils/player";

export default class FullPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };

    this._videoRef = createRef();

    this.onExitHandler = this.onExitHandler.bind(this);
    this.togglePlayHandler = this.togglePlayHandler.bind(this);
    this.onProgressHandler = this.onProgressHandler.bind(this);
    this.fullScreenClickHandler = this.fullScreenClickHandler.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.onKeyHandler = this.onKeyHandler.bind(this);
  }

  componentDidMount() {
    const video = this._videoRef.current;

    if (video) {
      video.ontimeupdate = this.updateTime;

      video.onloadedmetadata = () =>
        this.setState({
          duration: Math.trunc(video.duration),
        });
    }

    document.addEventListener(`keydown`, this.onKeyHandler);
  }

  componentWillUnmount() {
    this._videoRef.current.src = ``;
  }

  onKeyHandler(evt) {
    switch (evt.code) {
      case `Escape`:
        this.onExitHandler();
        break;

      case `Space`:
        this.togglePlayHandler();
        break;

      default:
        break;
    }
  }

  onExitHandler() {
    history.goBack();
  }

  togglePlayHandler() {
    this.setState((prevState) => {
      const video = this._videoRef.current;

      if (prevState.isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      return {
        isPlaying: !prevState.isPlaying
      };
    });
  }

  onProgressHandler(evt) {
    const currentTime = Math.trunc(evt.target.value * this.state.duration / 100);

    this.setState((prevState) => ({
      prevState,
      currentTime
    }));

    this._videoRef.current.currentTime = currentTime;
  }

  fullScreenClickHandler() {
    this._videoRef.current.requestFullscreen();
  }

  updateTime() {
    if (this._videoRef.current) {
      this.setState({
        currentTime: Math.trunc(this._videoRef.current.currentTime)
      });
    }
  }

  render() {
    const {title, picture, preview} = this.props.movie;
    const {isPlaying, duration, currentTime} = this.state;

    const elapsedTime = getTimeElapsed(duration, currentTime);
    const progress = getPosition(currentTime, duration);

    return (
      <div className="player">
        <video src={preview} className="player__video" poster={`/img/${picture}`} ref={this._videoRef}></video>

        <button type="button" className="player__exit" onClick={this.onExitHandler}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <input className="player__progress" type="range" min="0" max="100" value={progress}
                style={{background: `linear-gradient(to right, #D9CD8D 0%, #D9CD8D ${progress}%, rgba(255, 251, 231, 0.35) ${progress}%, rgba(255, 251, 231, 0.35) 100%)`}}
                onChange={this.onProgressHandler}
              />
            </div>
            <div className="player__time-value">{elapsedTime}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={this.togglePlayHandler}>
              {isPlaying ? (
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#pause"></use>
                </svg>
              ) : (
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
              )}
              <span>Play</span>
            </button>

            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={this.fullScreenClickHandler}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FullPlayer.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired
};
