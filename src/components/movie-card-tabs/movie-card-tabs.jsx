import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {MovieTabNames} from "../../const";
import Overview from "./overview";
import Details from "./details";
import Reviews from "./reviews";

const renderCurrentTab = (currentTab, movie) => {
  switch (currentTab) {
    case MovieTabNames.DETAILS:
      return <Details movie={movie} />;
    case MovieTabNames.REVIEWS:
      return <Reviews movieId={movie.id} />;
    default:
      return <Overview movie={movie} />;
  }
};

class MovieCardTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: MovieTabNames.REVIEWS
    };

    this.changeCurrentTab = this.changeCurrentTab.bind(this);
  }

  changeCurrentTab(tab) {
    this.setState({
      currentTab: tab
    });
  }

  render() {
    const {movie} = this.props;
    const {currentTab} = this.state;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(MovieTabNames).map((tab) => (
              <li key={tab} className={`movie-nav__item ${currentTab === tab && `movie-nav__item--active`}`}>
                <button className="movie-nav__link" onClick={() => this.changeCurrentTab(tab)}>{tab}</button>
              </li>
            ))}
          </ul>
        </nav>

        {renderCurrentTab(currentTab, movie)}
      </div>
    );
  }
}

MovieCardTabs.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    background: PropTypes.string
  }).isRequired
};

export default MovieCardTabs;
