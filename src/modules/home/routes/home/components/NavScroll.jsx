import React from "react";
import Scroll from "../../../components/Scroll";
import PropTypes from "prop-types";

const NavScroll = ({ categoryList, chooseHandle }) => {
  return (
    <div className="NavScroll_Component_wrapper">
      <Scroll scrollX scrollY={false}>
        <div className="NavScroll_Content">
          {categoryList.map((category) => {
            return (
              <div
                key={category.category}
                onClick={() => {
                  chooseHandle(category);
                }}
              >
                {category.category}
              </div>
            );
          })}
        </div>
      </Scroll>
    </div>
  );
};

NavScroll.propTypes = {
  categoryList: PropTypes.array,
  chooseHandle: PropTypes.func,
};
NavScroll.defaultProps = {
  categoryList: [],
  chooseHandle: () => {},
};

export default NavScroll;
