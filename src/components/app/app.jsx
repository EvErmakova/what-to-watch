import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import Catalog from "../catalog/catalog";
import {connect} from "react-redux";

class App extends PureComponent {
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

    return <Catalog onCardTitleClick={this._onCardTitleClick} />;
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
  movies: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps)(App);
