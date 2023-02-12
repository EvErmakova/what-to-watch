import React from "react";
import PropTypes from "prop-types";
import movies from "../../mocks/movies";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import MovieCardHead from "../movie-card/movie-card-head";

const MoviePage = (props) => {
  const {movie, onCardTitleClick} = props;
  const similar = movies.slice(0, 4);

  const getRateText = (value) => {
    if (value <= 3) {
      return `Bad`;
    }
    if (value <= 5) {
      return `Normal`;
    }
    if (value <= 8) {
      return `Good`;
    }
    if (value < 10) {
      return `Very Good`;
    }
    return `Awesome`;
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <MovieCardHead movie={movie} pageType="full" />
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={`img/${movie.poster}`} alt={movie.title} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <a href="#" className="movie-nav__link">Overview</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

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
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList movies={similar} onCardTitleClick={onCardTitleClick} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default MoviePage;
