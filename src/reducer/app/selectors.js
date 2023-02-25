import NameSpace from "../name-spaces";
import {createSelector} from "reselect";
import {getMovies} from "../data/selectors";

const NAME_SPACE = NameSpace.APP;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getMaxMoviesAmount = (state) => {
  return state[NAME_SPACE].maxMoviesAmount;
};

export const getMoviesByGenre = createSelector(
    getMovies,
    getGenre,
    (movies, genre) => {
      if (genre === `all`) {
        return movies;
      }
      return movies.filter((item) => item.genre === genre);
    }
);

export const getGenres = createSelector(
    getMovies,
    (movies) => [...new Set(movies.map((item) => item.genre))]
);

export const getFavoritesMovies = createSelector(
    getMovies,
    (movies) => {
      return movies.filter((item) => item.isFavorite);
    }
);
