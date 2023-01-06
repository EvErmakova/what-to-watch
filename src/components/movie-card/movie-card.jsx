import React from "react";
import PropTypes from "prop-types";
import {MoviesGenre} from "../../const";

const MovieCard = (props) => {
  const {movie, onHover} = props;
  const {title, image} = movie;

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver = {() => onHover(movie)}>
      <div className="small-movie-card__image">
        <img src={`img/` + image}
          alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">
          {title}
        </a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(Object.values(MoviesGenre)).isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onHover: PropTypes.func.isRequired
};

export default MovieCard;
