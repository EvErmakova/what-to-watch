import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Player from "../player/player";

export default class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this.handlerMouseOver = this.handlerMouseOver.bind(this);
    this.handlerMouseLeave = this.handlerMouseLeave.bind(this);
  }

  handlerMouseOver(movie) {
    this.props.onHover(movie);
    this.setState({
      isPlaying: true,
    });
  }

  handlerMouseLeave() {
    this.setState({
      isPlaying: false,
    });
  }

  render() {
    const {movie, onCardTitleClick} = this.props;
    const {isPlaying} = this.state;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={() => onCardTitleClick(movie.id)}
        onMouseOver = {() => this.handlerMouseOver(movie)}
        onMouseLeave={() => this.handlerMouseLeave()}
      >
        <div className="small-movie-card__image">
          <Player movie={movie} isPlaying={isPlaying} />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href={`/movie-page/${movie.id}`}>
            {movie.title}
          </a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};
