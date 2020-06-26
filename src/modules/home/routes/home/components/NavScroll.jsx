import React from "react";
import Scroll from "../../../components/Scroll";
// import PropTypes from 'prop-types';

const NavScroll = () => {
  return (
    <div className="NavScroll_Component_wrapper">
      <Scroll scrollX scrollY={false}>
        <div className="NavScroll_Content">
          <div>首页</div>
          <div>首真实的页</div>
          <div>首wef页</div>
          <div>首页</div>
          <div>首ssss页</div>
          <div>首页</div>
        </div>
      </Scroll>
    </div>
  );
};

NavScroll.propTypes = {};
NavScroll.defaultProps = {};

export default NavScroll;
