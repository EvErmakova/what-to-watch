import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {MoviesGenre} from "../../const";
import MovieCard from "../movie-card/movie-card";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null
    };

    this.onHover = this.onHover.bind(this);
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} onHover={this.onHover}/>
        ))}
      </div>
    );
  }

  onHover(movie) {
    this.setState({
      activeMovie: movie
    });
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(Object.values(MoviesGenre)).isRequired,
    image: PropTypes.string.isRequired
  }).isRequired)
};
