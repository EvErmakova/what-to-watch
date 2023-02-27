import React from "react";
import PropTypes from "prop-types";

const MoviePoster = ({poster, title, isSmall}) => {
  return (
    <div className={`movie-card__poster ${isSmall && `movie-card__poster--small`}`}>
      <img src={poster} alt={title} width="218" height="327"/>
    </div>
  );
};

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSmall: PropTypes.bool
};

export default MoviePoster;
