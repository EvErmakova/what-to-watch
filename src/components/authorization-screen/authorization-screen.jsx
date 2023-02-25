import React, {createRef} from "react";
import PropTypes from "prop-types";
import Footer from "../footer/footer";
import Header from "../header/header";

const AuthorizationScreen = (props) => {
  const {login} = props;

  const loginRef = createRef();
  const passwordRef = createRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      login: loginRef.current.value,
      password: passwordRef.current.value};
    login(data);
  };

  return (
    <div className="user-page">
      <Header pageType="user"/>

      <div className="sign-in user-page__content">
        <form onSubmit={submitHandler} action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

AuthorizationScreen.propTypes = {
  login: PropTypes.func.isRequired,
};

export default AuthorizationScreen;
