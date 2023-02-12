import React from "react";
import PropTypes from "prop-types";
import {MoviesGenre} from "../../const";
import MoviesList from "../movies-list/movies-list";
import Footer from "../footer/footer";
import MovieCardHead from "../movie-card/movie-card-head";

const Catalog = (props) => {
  const {movies, onCardTitleClick} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <MovieCardHead movie={movies[0]} />
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

          <MoviesList movies={movies} onCardTitleClick={onCardTitleClick} />
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
  }).isRequired),
  onCardTitleClick: PropTypes.func.isRequired
};

export default Catalog;
