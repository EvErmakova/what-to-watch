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

    this.handleHover = this.handleHover.bind(this);
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} onHover={this.handleHover}/>
        ))}
      </div>
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(Object.values(MoviesGenre)).isRequired,
    image: PropTypes.string.isRequired
  }).isRequired)
};
