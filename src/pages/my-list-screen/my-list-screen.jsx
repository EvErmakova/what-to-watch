import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getFavoritesMovies} from "../../reducer/data/selectors";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MoviesList from "../../components/movies-list/movies-list";
import {Operation} from "../../reducer/data/data";

class MyListScreen extends PureComponent {
  componentDidMount() {
    const { loadFavoriteMovies } = this.props;
    loadFavoriteMovies();
  }

  render() {
    const {movies} = this.props;

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
  }
};

MyListScreen.propTypes = {
  movies: PropTypes.array.isRequired,
  loadFavoriteMovies: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getFavoritesMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(Operation.loadFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListScreen);
