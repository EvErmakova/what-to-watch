import Movies from "./mocks/movies";

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`
};

const initialState = {
  genre: `all`,
  movies: Movies,
  filteredMovies: Movies
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),
  filterMovies: () => ({
    type: ActionType.GET_FILTERED_MOVIES
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return Object.assign({}, state, {genre: action.payload});

    case ActionType.GET_FILTERED_MOVIES:
      let movies = initialState.movies;

      if (state.genre !== `all`) {
        movies = state.movies.filter((item) => item.genre === state.genre);
      }

      return Object.assign({}, state, {filteredMovies: movies});

    default:
      return state;
  }
};

export {ActionCreator};
export default reducer;
