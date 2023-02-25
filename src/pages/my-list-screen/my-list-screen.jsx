import React from "react";
import {connect} from "react-redux";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MoviesList from "../../components/movies-list/movies-list";
import {getFavoritesMovies} from "../../reducer/app/selectors";
import PropTypes from "prop-types";

const MyListScreen = ({movies}) => {
  return (
    <div className="user-page">
      <Header pageType="user-list" title="My list" />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {movies.length > 0 ? <MoviesList movies={movies} /> : `Add movie to list`}
      </section>

      <Footer />
    </div>
  );
};

MyListScreen.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getFavoritesMovies(state)
});

export default connect(mapStateToProps)(MyListScreen);
