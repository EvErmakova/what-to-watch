import {amountStep} from "./const";

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  FILTER_MOVIES: `FILTER_MOVIES`,
  CHANGE_MOVIES_AMOUNT: `CHANGE_MOVIES_AMOUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const initialState = {
  genre: `all`,
  movies: [],
  filteredMovies: [],
  maxMoviesAmount: amountStep,
  isAuthorizationRequired: false
};

const adapter = (data) => {
  return data.map((movie) => ({
    id: movie.id.toString(),
    title: movie.name,
    picture: movie.backgroundImage,
    genre: movie.genre,
    year: movie.released.toString(),
    poster: movie.posterImage,
    ratingScore: movie.rating,
    ratingCount: movie.scoresCount,
    overview: movie.description,
    director: movie.director,
    starring: movie.starring,
    previewImage: movie.previewImage,
    previewVideo: movie.previewVideoLink,
    videoLink: movie.videoLink,
    background: movie.backgroundColor
  }));
};

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const getDataFromAdapter = adapter(response.data);
        dispatch(ActionCreator.loadMovies(getDataFromAdapter));
        dispatch(ActionCreator.filterMovies());
      });
  },
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),
  filterMovies: () => ({
    type: ActionType.FILTER_MOVIES
  }),
  changeMoviesAmount: () => ({
    type: ActionType.CHANGE_MOVIES_AMOUNT
  }),
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.payload});

    case ActionType.SET_GENRE:
      return Object.assign({}, state, {genre: action.payload});

    case ActionType.FILTER_MOVIES:
      let movies = state.movies;

      if (state.genre !== `all`) {
        movies = state.movies.filter((item) => item.genre === state.genre);
      }

      return Object.assign({}, state, {
        filteredMovies: movies,
        maxMoviesAmount: initialState.maxMoviesAmount
      });

    case ActionType.CHANGE_MOVIES_AMOUNT:
      return Object.assign({}, state, {maxMoviesAmount: state.maxMoviesAmount + amountStep});

    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isAuthorizationRequired: action.payload});

    default:
      return state;
  }
};

export {ActionCreator, Operation};
export default reducer;
