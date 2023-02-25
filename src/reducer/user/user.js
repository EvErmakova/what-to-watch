const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const initialState = {
  isLogin: false
};

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
    return api
      .post(`/login`,
          {
            email: authData.login,
            password: authData.password,
          }
      )
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(true));
      });
  },
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isLogin: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
