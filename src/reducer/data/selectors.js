import NameSpace from "../name-spaces";

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
