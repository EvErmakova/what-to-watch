import React, {Fragment} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import {connect} from "react-redux";
import {getMaxMoviesAmount} from "../../reducer/app/selectors";
import {ActionCreator} from "../../reducer/app/app";

const MoviesList = ({movies, onShowMore, maxMoviesAmount}) => (
  <Fragment>
    <div className="catalog__movies-list">
      {movies.slice(0, maxMoviesAmount).map((movie) => (
        <SmallMovieCard movie={movie} key={movie.id} />
      ))}
    </div>

    {movies.length > maxMoviesAmount && <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onShowMore}>Show more</button>
    </div>}
  </Fragment>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired),
  onShowMore: PropTypes.func.isRequired,
  maxMoviesAmount: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  maxMoviesAmount: getMaxMoviesAmount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMore: () => dispatch(ActionCreator.changeMoviesAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

