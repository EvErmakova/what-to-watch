import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPromo} from "../../reducer/data/selectors";
import {getMoviesByGenre} from "../../reducer/app/selectors";
import Header from "../../components/header/header";
import {MovieCardHead} from "../../components/movie-card";
import GenresList from "../../components/genres-list/genres-list";
import MoviesList from "../../components/movies-list/movies-list";
import Footer from "../../components/footer/footer";

const Catalog = (props) => {
  const {movies, promo} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <Header pageType="movie" />

        {promo.id && <MovieCardHead movie={promo} pageType="promo" />}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />
          <MoviesList movies={movies} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Catalog.propTypes = {
  movies: PropTypes.array.isRequired,
  promo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  promo: getPromo(state)
});

export default connect(mapStateToProps)(Catalog);
