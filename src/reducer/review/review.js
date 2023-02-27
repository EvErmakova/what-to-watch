import {history} from "../../utils/history";

const ActionType = {
  IS_COMMENT_LOADING: `IS_COMMENT_LOADING`,
  IS_REVIEW_ERROR: `IS_REVIEW_ERROR`,
};

const initialState = {
  isCommentLoading: false,
  isReviewError: false,
};

const Operation = {
  postNewComment: (movieId, commentPost) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsCommentLoading(true));
    return api.post(`/comments/${movieId}`, commentPost)
      .then((response) => {
        console.log(response.data);
        dispatch(ActionCreator.setIsReviewError(false));
        dispatch(ActionCreator.setIsCommentLoading(false));
        history.goBack();
      })
      .catch((err) => {
        dispatch(ActionCreator.setIsCommentLoading(false));
        dispatch(ActionCreator.setIsReviewError(true));
        throw err;
      });
  },
};

const ActionCreator = {
  setIsCommentLoading: (value) => {
    return {
      type: ActionType.IS_COMMENT_LOADING,
      payload: value,
    };
  },
  setIsReviewError: (value) => {
    return {
      type: ActionType.IS_REVIEW_ERROR,
      payload: value,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_COMMENT_LOADING:
      return Object.assign({}, state, {isCommentLoading: action.payload});

    case ActionType.IS_REVIEW_ERROR:
      return Object.assign({}, state, {isReviewError: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
