import {amountStep} from "../../const";

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  CHANGE_MOVIES_AMOUNT: `CHANGE_MOVIES_AMOUNT`,
};

const initialState = {
  genre: `all`,
  maxMoviesAmount: amountStep
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),
  changeMoviesAmount: () => ({
    type: ActionType.CHANGE_MOVIES_AMOUNT
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return Object.assign({}, state, {
        genre: action.payload,
        maxMoviesAmount: initialState.maxMoviesAmount
      });

    case ActionType.CHANGE_MOVIES_AMOUNT:
      return Object.assign({}, state, {maxMoviesAmount: state.maxMoviesAmount + amountStep});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer};
