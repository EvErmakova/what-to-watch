import React, {Fragment} from "react";
import Header from "../header/header";
import PropTypes from "prop-types";
import MovieCardButtons from "./movie-card-buttons";

const MovieCardHead = ({movie, pageType}) => {
  const {title, picture, genre, year, poster} = movie;

  const MoviePoster = () => {
    return (
      <div className="movie-card__poster">
        <img src={`img/${poster}`} alt={title} width="218" height="327"/>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="movie-card__bg">
        <img src={`img/${picture}`} alt={title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          {pageType !== `full` && <MoviePoster /> }

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{year}</span>
            </p>

            <MovieCardButtons />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MovieCardHead.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  pageType: PropTypes.string
};

export default MovieCardHead;