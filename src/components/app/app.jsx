import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {history} from "../../utils/history";
import {AppRoutes} from "../../const";
import MoviePage from "../movie-page/movie-page";
import Catalog from "../catalog/catalog";
import FullPlayer from "../full-player/full-player";
import AuthorizationScreen from "../authorization-screen/authorization-screen";

const App = ({movies, isAuthorizationRequired}) => {
  if (isAuthorizationRequired) {
    return <AuthorizationScreen />;
  }

  if (movies.length) {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoutes.ROOT}>
            <Catalog/>
          </Route>

          <Route exact path={`${AppRoutes.MOVIE_PAGE}/:movieId`} render={
            ({match}) => {
              const movie = movies.find((item) => item.id === match.params.movieId);
              return (<MoviePage movie={movie}/>);
            }
          }/>

          <Route exact path={`${AppRoutes.PLAYER}/:movieId`} render={
            ({match}) => {
              const movie = movies.find((item) => item.id === match.params.movieId);
              return (<FullPlayer movie={movie}/>);
            }
          }/>
        </Switch>
      </Router>
    );
  }

  return <div>Загрузка...</div>;
};

App.propTypes = {
  movies: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  isAuthorizationRequired: state.isAuthorizationRequired
});

export default connect(mapStateToProps)(App);
