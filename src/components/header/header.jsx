import React from "react";
import Logo from "../logo/logo";
import PropTypes from "prop-types";

const Header = ({isAuth, pageType}) => {
  const headerClass = () => {
    switch (pageType) {
      case `user`:
        return `user-page__head`;
      case `movie`:
        return `movie-card__head`;
      default:
        return ``;
    }
  };

  return (
    <header className={`page-header ${headerClass()}`}>
      <Logo />

      {isAuth ? <div className="user-block">
        <div className="user-block__avatar">
          <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      </div> : <h1 className="page-title user-page__title">Sign in</h1>}
    </header>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  pageType: PropTypes.string
};

export default Header;
