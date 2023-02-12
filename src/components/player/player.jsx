import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

export default class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._timeout = null;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    if (this.props.isPlaying) {
      this._timeout = setTimeout(() => video.play(), 1000);
    } else {
      clearTimeout(this._timeout);
      this._videoRef.current.load();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    const {movie} = this.props;

    return (
      <video
        src={movie.preview}
        poster={`img/${movie.picture}`}
        muted
        ref = {this._videoRef}
        width="280" height="175"></video>
    );
  }
}

Player.propTypes = {
  movie: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }),
  isPlaying: PropTypes.bool.isRequired
};
