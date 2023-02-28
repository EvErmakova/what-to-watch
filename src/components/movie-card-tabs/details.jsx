import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getFormattedRuntime} from "../../utils/movie";

const Details = ({movie}) => {
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{movie.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {movie.starring.map((item, index) => (
              <Fragment key={`star${index}`}>{item}<br/></Fragment>
            ))}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{getFormattedRuntime(movie.runTime)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{movie.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{movie.year}</span>
        </p>
      </div>
    </div>
  );
};

Details.propTypes = {
  movie: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired
};

export default Details;
