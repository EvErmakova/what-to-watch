import React, {Fragment} from "react";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Fragment>{props.children}</Fragment>;
};

ScrollToTop.propTypes = {
  children: PropTypes.element
};

export default ScrollToTop;
