import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/app/app";
import {getGenre} from "../../reducer/app/selectors";

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
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSetGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSetGenre: (genre) => {
    dispatch(ActionCreator.setGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
