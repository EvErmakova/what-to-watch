import React from "react";
import PropTypes from "prop-types";

const Review = ({comment}) => {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
};

Review.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};

export default Review;
