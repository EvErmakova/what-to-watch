import {history} from "../../utils/history";

const ActionType = {
  POST_NEW_COMMENT: `POST_NEW_COMMENT`,
  IS_COMMENT_LOADING: `IS_COMMENT_LOADING`,
  IS_REVIEW_ERROR: `IS_REVIEW_ERROR`,
};

const initialState = {
  newComment: {},
  isCommentLoading: false,
  isReviewError: false,
};

const Operation = {
  postNewComment: (movieId, commentPost) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsCommentLoading(true));
    return api.post(`/comments/${movieId}`, commentPost)
      .then((response) => {
        dispatch(ActionCreator.postNewComment(response.data));
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
  postNewComment: (review) => {
    return {
      type: ActionType.POST_NEW_COMMENT,
      payload: review,
    };
  },
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
    case ActionType.POST_NEW_COMMENT:
      return Object.assign({}, state, {newComment: action.payload});

    case ActionType.IS_COMMENT_LOADING:
      return Object.assign({}, state, {isCommentLoading: action.payload});

    case ActionType.IS_REVIEW_ERROR:
      return Object.assign({}, state, {isReviewError: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
