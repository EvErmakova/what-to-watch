import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MovieCardHead from "../movie-card/movie-card-head";
import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import Footer from "../footer/footer";
import {ActionCreator} from "../../reducer";

const Catalog = (props) => {
  const {movies, filteredMovies, onCardTitleClick, onShowMore, maxMoviesAmount} = props;
  const promo = movies[0];

  return (
    <React.Fragment>
      <section className="movie-card">
        <MovieCardHead movie={promo} />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <MoviesList movies={filteredMovies.slice(0, maxMoviesAmount)} onCardTitleClick={onCardTitleClick} />

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
  onCardTitleClick: PropTypes.func.isRequired,
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
