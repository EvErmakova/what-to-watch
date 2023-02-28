import {ApiRoutes} from "../../const";
import {history} from "../../utils/history";

const ActionType = {
  IS_COMMENT_LOADING: `IS_COMMENT_LOADING`,
  IS_REVIEW_ERROR: `IS_REVIEW_ERROR`,
  LOAD_COMMENTS: `LOAD_COMMENTS`
};

const initialState = {
  isCommentLoading: false,
  isReviewError: false,
  comments: []
};

const Operation = {
  postNewComment: (movieId, commentPost) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsCommentLoading(true));
    return api.post(`${ApiRoutes.REVIEWS}/${movieId}`, commentPost)
      .then(() => {
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
  loadComments: (MovieId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsCommentLoading(true));
    return api.get(`${ApiRoutes.REVIEWS}/${MovieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
        dispatch(ActionCreator.setIsCommentLoading(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.setIsCommentLoading(false));
        throw err;
      });
  }
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
  },
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_COMMENT_LOADING:
      return Object.assign({}, state, {isCommentLoading: action.payload});

    case ActionType.IS_REVIEW_ERROR:
      return Object.assign({}, state, {isReviewError: action.payload});

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {comments: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer, Operation};
