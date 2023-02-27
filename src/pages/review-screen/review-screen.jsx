import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AppRoutes} from "../../const";
import {getIsCommentLoading, getIsReviewError} from "../../reducer/review/selectors";
import {Operation} from "../../reducer/review/review";
import Header from "../../components/header/header";
import MovieCardHead from "../../components/movie-card/movie-card-head";

const DEFAULT_CHECKED = 1;

class ReviewScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: DEFAULT_CHECKED,
      comment: ``
    };

    this.changeRatingComment = this.changeRatingComment.bind(this);
    this.changeTextComment = this.changeTextComment.bind(this);
    this.postNewCommentHandler = this.postNewCommentHandler.bind(this);
  }

  changeRatingComment(evt) {
    this.setState({
      rating: Number(evt.target.value)
    });
  }

  changeTextComment(evt) {
    this.setState({
      comment: evt.target.value
    });
  }

  postNewCommentHandler(evt) {
    evt.preventDefault();

    const {rating, comment} = this.state;

    this.props.postNewComment(this.props.movie.id, {
      rating,
      comment,
    });

    this.setState({
      rating: 1,
      comment: ``
    });
  }

  render() {
    const {movie, isCommentLoading, isReviewError} = this.props;
    const {rating, comment} = this.state;

    const breadcrumbs = [
      {title: movie.title, link: `${AppRoutes.MOVIE_PAGE}/${movie.id}`},
      {title: `Add review`}
    ];

    const isButtonBlocked = isCommentLoading || !(rating && comment);

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <Header pageType="movie" breadcrumbs={breadcrumbs}/>

          <MovieCardHead movie={movie} pageType="review"/>
        </div>

        <div className="add-review">
          <form onSubmit={this.postNewCommentHandler}
            action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars" onChange={this.changeRatingComment}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Fragment key={item}>
                    <input className="rating__input" id={`star-${item}`} type="radio" name="rating" value={item}
                      defaultChecked={item === DEFAULT_CHECKED && true}
                      disabled={isCommentLoading}
                    />
                    <label className="rating__label" htmlFor={`star-${item}`}>Rating {item}</label>
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                onChange={this.changeTextComment}
                disabled={isCommentLoading}
                value={comment}
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isButtonBlocked}>Post</button>
              </div>

            </div>
          </form>

          {isReviewError && <p style={{color: `red`}}>Something went wrong...</p>}
        </div>
      </section>
    );
  }
}

ReviewScreen.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  isCommentLoading: PropTypes.bool.isRequired,
  isReviewError: PropTypes.bool.isRequired,
  postNewComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isCommentLoading: getIsCommentLoading(state),
  isReviewError: getIsReviewError(state)
});

const mapDispatchToProps = (dispatch) => ({
  postNewComment: (movieId, comment) => dispatch(Operation.postNewComment(movieId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);
