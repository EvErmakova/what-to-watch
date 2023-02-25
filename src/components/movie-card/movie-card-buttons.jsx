import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../const";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";

const MovieCardButtons = ({movieId, isFavorite, isLogin}) => {
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
          <button className="btn btn--list movie-card__button" type="button">
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

          <a href="add-review.html" className="btn movie-card__button">Add review</a>
        </Fragment>
      }
    </div>
  );
};

MovieCardButtons.propTypes = {
  movieId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  isLogin: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(MovieCardButtons);
