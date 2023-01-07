import React from "react";
import PropTypes from "prop-types";
import {MoviesGenre} from "../../const";
import MoviesList from "../movies-list/movies-list";
import Header from "../header/header";
import Footer from "../footer/footer";

const Catalog = (props) => {
  const {movies} = props;
  const promo = movies[0];

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={`img/` + promo.picture} alt={promo.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={`img/` + promo.poster} alt={promo.title} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promo.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promo.genre}</span>
                <span className="movie-card__year">{promo.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            {Object.values(MoviesGenre).map((genre, index) => (
              <li className="catalog__genres-item" key={`genre-` + index}>
                <a href="#" className="catalog__genres-link">{genre}</a>
              </li>
            ))}
          </ul>

          <MoviesList movies={movies} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired)
};

export default Catalog;
