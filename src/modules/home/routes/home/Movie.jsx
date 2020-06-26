import React from "react";
import NavScroll from "./components/NavScroll";
// import PropTypes from "prop-types";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Movie_Page_Wrapper">
        <NavScroll />
      </div>
    );
  }
}

Movie.propTypes = {};
