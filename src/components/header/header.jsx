import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AppRoutes} from "../../const";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import Logo from "../logo/logo";

const Header = ({pageType, title, isLogin}) => {
  const headerClass = () => {
    switch (pageType) {
      case `login`:
      case `user-list`:
        return `user-page__head`;
      case `movie`:
        return `movie-card__head`;
      default:
        return ``;
    }
  };

  const Avatar = () => (
    <div className="user-block__avatar">
      <Link to={AppRoutes.MY_LIST}><img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/></Link>
    </div>
  );

  return (
    <header className={`page-header ${headerClass()}`}>
      <Logo />

      {title && <h1 className="page-title user-page__title">{title}</h1>}

      {pageType !== `login` &&
        <div className="user-block">
          {isLogin ? <Avatar /> : <Link to={AppRoutes.LOGIN} className="user-block__link">Sign in</Link>}
        </div>
      }
    </header>
  );
};

Header.propTypes = {
  pageType: PropTypes.string,
  title: PropTypes.string,
  isLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
  isLogin: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(Header);
