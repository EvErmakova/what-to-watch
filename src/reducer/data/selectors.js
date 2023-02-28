import NameSpace from "../name-spaces";
import {createSelector} from "reselect";
import {similarCount} from "../../const";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getFavoritesMovies = (state) => {
  return state[NAME_SPACE].favoriteMovies;
};

export const getPromo = (state) => {
  return state[NAME_SPACE].promo;
};

export const getGenres = createSelector(
    getMovies,
    (movies) => [...new Set(movies.map((item) => item.genre))]
);

export const getSimilarMovies = (state, movie) => {
  const movies = getMovies(state);

  return movies.filter((item) => item.genre === movie.genre && item.id !== movie.id).slice(0, similarCount);
};
