const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE: `LOAD_MOVIE`,
  GET_PROMO: `GET_PROMO`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
};

const initialState = {
  movies: [],
  favoriteMovies: [],
  promo: {}
};

const adapter = (data) => {
  return data.map((movie) => movieAdapter(movie));
};

const movieAdapter = (movie) => ({
  id: movie.id.toString(),
  title: movie.name,
  picture: movie.background_image,
  genre: movie.genre,
  year: movie.released.toString(),
  poster: movie.poster_image,
  ratingScore: movie.rating,
  ratingCount: movie.scores_count,
  overview: movie.description,
  director: movie.director,
  starring: movie.starring,
  previewImage: movie.preview_image,
  previewVideo: movie.preview_video_link,
  videoLink: movie.video_link,
  background: movie.background_color,
  isFavorite: movie.is_favorite
});

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const getDataFromAdapter = adapter(response.data);
        dispatch(ActionCreator.loadMovies(getDataFromAdapter));
      })
      .catch((err) => {
        throw err;
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`).then((response) => {
      const dataFromAdapter = movieAdapter(response.data);
      dispatch(ActionCreator.getPromo(dataFromAdapter));
    })
    .catch((err) => {
      throw err;
    });
  },

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const getDataFromAdapter = adapter(response.data);
        dispatch(ActionCreator.loadFavoriteMovies(getDataFromAdapter));
      })
      .catch((err) => {
        throw err;
      });
  },

  setFavoriteMovie: (MovieId, isFavorite, pageType) => (dispatch, getState, api) => {
    const status = isFavorite ? 1 : 0;
    return api.post(`/favorite/${MovieId}/${status}`, {
      [`is_favorite`]: isFavorite,
    })
      .then((response) => {
        const dataFromAdapter = movieAdapter(response.data);

        if (pageType === `promo`) {
          dispatch(ActionCreator.getPromo(dataFromAdapter));
        }

        dispatch(ActionCreator.loadMovie(dataFromAdapter));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadMovie: (movie) => ({
    type: ActionType.LOAD_MOVIE,
    payload: movie
  }),
  getPromo: (movie) => ({
    type: ActionType.GET_PROMO,
    payload: movie
  }),
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {movies: action.payload});

    case ActionType.LOAD_MOVIE:
      const movie = action.payload;
      const movieIdx = state.movies.findIndex((item) => item.id === movie.id);
      const movies = [...state.movies.slice(0, movieIdx), movie, ...state.movies.slice(movieIdx + 1)];
      return Object.assign({}, state, {movies});

    case ActionType.GET_PROMO:
      return Object.assign({}, state, {promo: action.payload});

    case ActionType.LOAD_FAVORITE_MOVIES:
      return Object.assign({}, state, {favoriteMovies: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
