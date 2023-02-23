import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";

export const MoviesList = ({movies}) => (
  <div className="catalog__movies-list">
    {movies.map((movie) => (
      <SmallMovieCard movie={movie} key={movie.id} />
    ))}
  </div>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired),
};
