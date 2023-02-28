import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.REVIEW;

export const getIsCommentLoading = (state) => {
  return state[NAME_SPACE].isCommentLoading;
};

export const getIsReviewError = (state) => {
  return state[NAME_SPACE].isReviewError;
};

export const getMovieComments = (state) => {
  return state[NAME_SPACE].comments;
};
