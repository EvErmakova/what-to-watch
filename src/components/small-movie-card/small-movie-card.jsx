import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {AppRoutes} from "../../const";
import Player from "../player/player";

export class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };

    this.handlerMouseOver = this.handlerMouseOver.bind(this);
    this.handlerMouseLeave = this.handlerMouseLeave.bind(this);
  }

  handlerMouseOver() {
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
    const {movie} = this.props;
    const {isPlaying} = this.state;

    return (
      <Link to={`${AppRoutes.MOVIE_PAGE}/${movie.id}`} className="small-movie-card catalog__movies-card"
        onMouseOver={this.handlerMouseOver}
        onMouseLeave={this.handlerMouseLeave}
      >
        <div className="small-movie-card__image">
          <Player movie={movie} isPlaying={isPlaying} />
        </div>
        <h3 className="small-movie-card__title">
          <span className="small-movie-card__link">
            {movie.title}
          </span>
        </h3>
      </Link>
    );
  }
}

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default SmallMovieCard;
