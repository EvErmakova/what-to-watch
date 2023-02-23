import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import Catalog from "../catalog/catalog";
import {connect} from "react-redux";

const App = ({movies}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Catalog />
        </Route>
        <Route exact path="/:movieId" render={
          ({match}) => {
            const movie = movies.find((item) => item.id === match.params.movieId);
            return (<MoviePage movie={movie} />);
          }
        } />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  movies: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps)(App);
