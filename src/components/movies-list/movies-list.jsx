import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this.handleHover = this.handleHover.bind(this);
  }

  render() {
    const {movies} = this.props;

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} onHover={this.handleHover}/>
          ))}
        </div>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </React.Fragment>
    );
  }

  handleHover(movie) {
    this.setState({
      activeMovie: movie
    });
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired)
};
