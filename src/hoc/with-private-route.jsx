import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoutes} from "../const";
import {getAuthorizationStatus} from "../reducer/user/selectors";

const PrivateRoute = ({path, render, exact, isLogin}) => (
  <Route exact={exact} path={path} render={
    ({match}) => {
      return isLogin ? render({match}) : <Redirect to={AppRoutes.LOGIN}/>;
    }
  }/>
);

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  isLogin: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(PrivateRoute);
