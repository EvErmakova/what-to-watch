import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import Header from "../header/header";
import MovieCardHead from "../movie-card/movie-card-head";
import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import Footer from "../footer/footer";

const Catalog = (props) => {
  const {movies, filteredMovies, onShowMore, maxMoviesAmount} = props;
  const promo = movies[0];

  return (
    <React.Fragment>
      <section className="movie-card">
        <h1 className="visually-hidden">WTW</h1>
        <Header isAuth={true} pageType="movie" />

        <MovieCardHead movie={promo} />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <MoviesList movies={filteredMovies.slice(0, maxMoviesAmount)} />

          {filteredMovies.length > maxMoviesAmount && <div className="catalog__more">
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
  filteredMovies: PropTypes.array.isRequired,
  onShowMore: PropTypes.func.isRequired,
  maxMoviesAmount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  movies: state.movies,
  filteredMovies: state.filteredMovies,
  maxMoviesAmount: state.maxMoviesAmount
});

const mapDispatchToProps = (dispatch) => ({
  onShowMore: () => dispatch(ActionCreator.changeMoviesAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
