import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getIsCommentLoading, getMovieComments} from "../../reducer/review/selectors";
import {Operation} from "../../reducer/review/review";
import Review from "./review";

class Reviews extends PureComponent {
  constructor(props) {
    super(props);

    this.getCurrentComments = this.getCurrentComments.bind(this);
  }

  componentDidMount() {
    const {loadComments, movieId} = this.props;
    loadComments(movieId);
  }

  componentDidUpdate(nextProps) {
    const {loadComments, movieId} = this.props;

    if (nextProps.movieId !== movieId) {
      loadComments(movieId);
    }
  }

  getCurrentComments(comments) {
    if (comments.length > 0) {
      const median = Math.ceil(comments.length / 2);
      return [comments.slice(0, median), comments.slice(median)];
    }

    return [];
  }

  render() {
    const {comments, isCommentLoading} = this.props;

    const currentComments = this.getCurrentComments(comments);

    return !isCommentLoading && (
      <div className="movie-card__reviews movie-card__row">
        {currentComments.length > 0 ? currentComments.map((commentsList, index) => (
          <div className="movie-card__reviews-col" key={`comments-${index}`}>
            {commentsList.map((comment) => (
              <Review comment={comment} key={comment.id} />
            ))}
          </div>
        )) : `No comments`}
      </div>
    );
  }
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  loadComments: PropTypes.func.isRequired,
  isCommentLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  comments: getMovieComments(state),
  isCommentLoading: getIsCommentLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(movieId) {
    dispatch(Operation.loadComments(movieId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
