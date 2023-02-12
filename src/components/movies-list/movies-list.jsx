import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this._handleHover = this._handleHover.bind(this);
  }

  _handleHover(movie) {
    this.setState(() => ({
      activeMovie: movie
    }));
  }

  render() {
    const {movies, onCardTitleClick} = this.props;

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movies.map((movie) => (
            <SmallMovieCard movie={movie} key={movie.id} onHover={this._handleHover} onCardTitleClick={onCardTitleClick} />
          ))}
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired),
  onCardTitleClick: PropTypes.func.isRequired
};
