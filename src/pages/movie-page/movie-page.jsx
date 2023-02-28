import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSimilarMovies} from "../../reducer/data/selectors";
import Header from "../../components/header/header";
import {MovieCardHead} from "../../components/movie-card";
import MovieCardTabs from "../../components/movie-card-tabs/movie-card-tabs";
import MoviesList from "../../components/movies-list/movies-list";
import Footer from "../../components/footer/footer";

const MoviePage = (props) => {
  const {movies, movie} = props;

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: movie.background}}>
        <div className="movie-card__hero">
          <Header pageType="movie" />

          <MovieCardHead movie={movie} pageType="full" />
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.poster} alt={movie.title} width="218" height="327"/>
            </div>

            <MovieCardTabs movie={movie} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList movies={movies} />
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
    background: PropTypes.string
  }).isRequired,
  movies: PropTypes.array.isRequired
};

const MapStateToProps = (state, ownProps) => ({
  ownProps,
  movies: getSimilarMovies(state, ownProps.movie)
});

export default connect(MapStateToProps)(MoviePage);
