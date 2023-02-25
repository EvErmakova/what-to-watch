const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_PROMO: `GET_PROMO`
};

const initialState = {
  movies: [],
  promo: {}
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

const movieAdapter = (movie) => ({
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
});

const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const getDataFromAdapter = adapter(response.data);
        dispatch(ActionCreator.loadMovies(getDataFromAdapter));
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/promo`).then((response) => {
      const dataFromAdapter = movieAdapter(response.data);
      dispatch(ActionCreator.getPromo(dataFromAdapter));
    });
  },
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  getPromo: (movie) => ({
    type: ActionType.GET_PROMO,
    payload: movie
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.payload});

    case ActionType.GET_PROMO:
      return Object.assign({}, state, {promo: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
