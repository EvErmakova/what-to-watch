import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import Catalog from "../catalog/catalog";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movieId: null,
    };

    this._onCardTitleClick = this._onCardTitleClick.bind(this);
  }

  _onCardTitleClick(id) {
    this.setState(() => ({
      movieId: id
    }));
  }

  _renderMainScreen() {
    const {movies} = this.props;
    const {movieId} = this.state;

    if (movieId) {
      const selectedMovie = movies.find((movie) => movie.id === movieId);
      return <MoviePage movie={selectedMovie} />;
    }

    return <Catalog movies={movies} onCardTitleClick={this._onCardTitleClick} />;
  }

  render() {
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={movies[0]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  }).isRequired)
};
