import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AppRoutes} from "../../const";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation} from "../../reducer/data/data";

const MovieCardButtons = ({movieId, isFavorite, isLogin, pageType, onToggleFavorite}) => {
  return (
    <div className="movie-card__buttons">
      <Link to={`${AppRoutes.PLAYER}/${movieId}`} className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>

      {isLogin &&
        <Fragment>
          <button className="btn btn--list movie-card__button" type="button"
            onClick={() => onToggleFavorite(movieId, !isFavorite, pageType)}
          >
            {isFavorite ?
              <svg viewBox="0 0 18 14" width="18" height="14">
                <use xlinkHref="#in-list"></use>
              </svg>
              :
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
            }
            <span>My list</span>
          </button>

          <Link to={`${AppRoutes.MOVIE_PAGE}/${movieId}${AppRoutes.ADD_REVIEW}`} className="btn movie-card__button">
            Add review
          </Link>
        </Fragment>
      }
    </div>
  );
};

MovieCardButtons.propTypes = {
  movieId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  isLogin: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onToggleFavorite: (movieId, isFavorite, pageType) => {
    dispatch(Operation.setFavoriteMovie(movieId, isFavorite, pageType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCardButtons);
