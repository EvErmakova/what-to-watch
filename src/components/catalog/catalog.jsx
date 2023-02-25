import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app/app";
import {getMovies, getPromo} from "../../reducer/data/selectors";
import {getMoviesByGenre, getMaxMoviesAmount} from "../../reducer/app/selectors";
import {getAllGenres} from "../../utils/movie";
import Header from "../header/header";
import MovieCardHead from "../movie-card/movie-card-head";
import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import Footer from "../footer/footer";

const Catalog = (props) => {
  const {movies, moviesByGenre, promo, onShowMore, maxMoviesAmount} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <h1 className="visually-hidden">WTW</h1>
        <Header isAuth={true} pageType="movie" />

        {promo && <MovieCardHead movie={promo} />}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={getAllGenres(movies)} />

          <MoviesList movies={moviesByGenre.slice(0, maxMoviesAmount)} />

          {moviesByGenre.length > maxMoviesAmount && <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={onShowMore}>Show more</button>
          </div>}
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Catalog.propTypes = {
  movies: PropTypes.array.isRequired,
  moviesByGenre: PropTypes.array.isRequired,
  promo: PropTypes.object.isRequired,
  onShowMore: PropTypes.func.isRequired,
  maxMoviesAmount: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  moviesByGenre: getMoviesByGenre(state),
  promo: getPromo(state),
  maxMoviesAmount: getMaxMoviesAmount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMore: () => dispatch(ActionCreator.changeMoviesAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
