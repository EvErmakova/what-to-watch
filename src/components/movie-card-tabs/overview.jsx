import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getRateText} from "../../utils/movie";

const Overview = ({movie}) => {
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{movie.ratingScore}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRateText(movie.ratingScore)}</span>
          <span className="movie-rating__count">{movie.ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {movie.overview.split(`/`).map((item, index) => (
          <p key={`overview-` + index}>{item}</p>
        ))}

        <p className="movie-card__director"><strong>{movie.director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
      </div>
    </Fragment>
  );
};

Overview.propTypes = {
  movie: PropTypes.shape({
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired
};

export default Overview;
