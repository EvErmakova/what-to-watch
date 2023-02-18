import Movies from "./mocks/movies";

const SET_GENRE = `SET_GENRE`;
const GET_FILTERED_MOVIES = `GET_FILTERED_MOVIES`;

const initialState = {
  genre: null,
  movies: Movies
};

const actionCreator = {
  setGenre: (genre) => ({
    type: SET_GENRE,
    payload: genre
  }),
  getFilteredMovies: () => ({
    type: GET_FILTERED_MOVIES
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRE:
      return {
        state,
        genre: action.payload
      };

    case GET_FILTERED_MOVIES:
      return {
        genre: state.genre,
        movies: initialState.movies.filter((item) => item.genre === state.genre)
      };

    default:
      return state;
  }
};

export {actionCreator};
export default reducer;
