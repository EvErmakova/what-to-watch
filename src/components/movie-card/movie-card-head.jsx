import React, {Fragment} from "react";
import PropTypes from "prop-types";
import MovieCardButtons from "./movie-card-buttons";
import MoviePoster from "./movie-card-poster";

const MovieCardHead = ({movie, pageType}) => {
  const {title, picture, genre, year, poster, id, isFavorite} = movie;

  return (
    <Fragment>
      <div className="movie-card__bg">
        <img src={picture} alt={title}/>
      </div>

      {pageType === `review` ? (
        <MoviePoster poster={poster} title={title} isSmall={true}/>
      ) : (
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            {pageType !== `full` && <MoviePoster poster={poster} title={title}/>}

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <MovieCardButtons movieId={id} isFavorite={isFavorite} pageType={pageType} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

MovieCardHead.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired
  }).isRequired,
  pageType: PropTypes.string.isRequired
};

export default MovieCardHead;
