import Movies from "./mocks/movies";
import {amountStep} from "./const";

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  FILTER_MOVIES: `FILTER_MOVIES`,
  CHANGE_MOVIES_AMOUNT: `CHANGE_MOVIES_AMOUNT`
};

const initialState = {
  genre: `all`,
  movies: Movies,
  filteredMovies: Movies,
  maxMoviesAmount: amountStep
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),
  filterMovies: () => ({
    type: ActionType.FILTER_MOVIES
  }),
  changeMoviesAmount: () => ({
    type: ActionType.CHANGE_MOVIES_AMOUNT
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return Object.assign({}, state, {genre: action.payload});

    case ActionType.FILTER_MOVIES:
      let movies = initialState.movies;

      if (state.genre !== `all`) {
        movies = state.movies.filter((item) => item.genre === state.genre);
      }

      return Object.assign({}, state, {
        filteredMovies: movies,
        maxMoviesAmount: initialState.maxMoviesAmount
      });

    case ActionType.CHANGE_MOVIES_AMOUNT:
      return Object.assign({}, state, {maxMoviesAmount: state.maxMoviesAmount + amountStep});

    default:
      return state;
  }
};

export {ActionCreator};
export default reducer;
