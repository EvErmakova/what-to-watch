import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Breadcrumbs = ({breadcrumbs}) => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {breadcrumbs.map(({title, link = null}, index) => (
          <li className="breadcrumbs__item" key={`breadcrumbs-${index}`}>
            {link ? <Link to={link} className="breadcrumbs__link">{title}</Link> : <span>{title}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string.isRequired, link: PropTypes.string}))
};

export default Breadcrumbs;
