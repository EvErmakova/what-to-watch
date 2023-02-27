const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER: `GET_USER`
};

const initialState = {
  isLogin: false,
  user: {}
};

const userAdapter = (user) => ({
  user,
  avatar: user.avatar_url
});

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(false));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        const getDataFromAdapter = userAdapter(response.data);
        dispatch(ActionCreator.getUser(getDataFromAdapter));
        dispatch(ActionCreator.requireAuthorization(true));
      })
      .catch((err) => {
        throw err;
      });
  }
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  getUser: (user) => ({
    type: ActionType.GET_USER,
    payload: user
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isLogin: action.payload});

    case ActionType.GET_USER:
      return Object.assign({}, state, {user: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
