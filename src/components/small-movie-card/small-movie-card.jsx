import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie, onHover, onCardTitleClick} = props;
  const {id, title, picture} = movie;

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver = {() => onHover(movie)}
      onClick={() => onCardTitleClick(movie.id)}
    >
      <div className="small-movie-card__image">
        <img src={`img/${picture}`} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={`/movie-page/${id}`}>
          {title}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default SmallMovieCard;
