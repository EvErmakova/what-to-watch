import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/app/app";
import {getGenre} from "../../reducer/app/selectors";
import {getGenres} from "../../reducer/data/selectors";

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
    const genres = this.props.genres;
    const activeGenre = this.props.genre;

    return (
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${activeGenre === `all` ? `catalog__genres-item--active` : ``}`}>
          <button className="catalog__genres-link" onClick={this._onGenreClick} data-genre="all">All genres</button>
        </li>
        {Object.values(genres).map((genre, index) => (
          <li className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`}
            key={`genre-` + index}
          >
            <button className="catalog__genres-link" onClick={this._onGenreClick} data-genre={genre}>{genre}</button>
          </li>
        ))}
      </ul>
    );
  }
}

GenresList.propTypes = {
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSetGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSetGenre: (genre) => {
    dispatch(ActionCreator.setGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
