import React, {PureComponent} from "react";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this._onGenreClick = this._onGenreClick.bind(this);
  }

  _onGenreClick(evt) {
    evt.preventDefault();
    this.props.onSetGenre(evt.target.dataset.genre);
  }

  render() {
    const genres = [...new Set(this.props.movies.map((item) => item.genre))];
    const activeGenre = this.props.genre;

    return (
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${activeGenre === `all` ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link" onClick={this._onGenreClick} data-genre="all">All genres</a>
        </li>
        {Object.values(genres).map((genre, index) => (
          <li className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`}
            key={`genre-` + index}
          >
            <a href="#" className="catalog__genres-link" onClick={this._onGenreClick} data-genre={genre}>{genre}</a>
          </li>
        ))}
      </ul>
    );
  }
}

GenresList.propTypes = {
  genre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
  }).isRequired),
  onSetGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
  onSetGenre: (genre) => {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.filterMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
