import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoutes} from "../../const";
import {getMovies} from "../../reducer/data/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import PrivateRoute from "../../hoc/with-private-route";
import Loader from "../loader/loader";
import ScrollToTop from "../scroll-to-top/scroll-to-top";
import Catalog from "../../pages/catalog/catalog";
import AuthorizationScreen from "../../pages/authorization-screen/authorization-screen";
import MoviePage from "../../pages/movie-page/movie-page";
import FullPlayer from "../../pages/full-player/full-player";
import MyListScreen from "../../pages/my-list-screen/my-list-screen";
import ReviewScreen from "../../pages/review-screen/review-screen";

const App = ({movies, isLogin, login}) => {
  return movies.length > 0 ? (
    <ScrollToTop>
      <Switch>
        <Route exact path={AppRoutes.ROOT}>
          <Catalog />
        </Route>

        <Route exact path={AppRoutes.LOGIN}
          render={() => isLogin ? <Redirect to={AppRoutes.ROOT}/> : <AuthorizationScreen login={login}/>}
        />

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

        <PrivateRoute exact path={AppRoutes.MY_LIST} render={() => <MyListScreen />} />

        <PrivateRoute exact path={`${AppRoutes.MOVIE_PAGE}/:movieId${AppRoutes.ADD_REVIEW}`} render={
          ({match}) => {
            const movie = movies.find((item) => item.id === match.params.movieId);
            return <ReviewScreen movie={movie} />;
          }
        }/>
      </Switch>
    </ScrollToTop>
  ) : <Loader />;
};

App.propTypes = {
  movies: PropTypes.array.isRequired,
  isLogin: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  isLogin: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
