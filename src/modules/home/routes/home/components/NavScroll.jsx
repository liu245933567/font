import React from "react";
import Scroll from "../../../components/Scroll";
import PropTypes from "prop-types";

const NavScroll = ({ categoryList, curCategory, chooseHandle }) => {
  return (
    <div className="NavScroll_Component_wrapper">
      <Scroll scrollX scrollY={false}>
        <div className="NavScroll_Content">
          {categoryList.map((category) => {
            return (
              <div
                className={
                  ((curCategory || categoryList[0].category) ===
                  category.category ) && 'isActive'
                }
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
  curCategory: PropTypes.string,
  chooseHandle: PropTypes.func,
};
NavScroll.defaultProps = {
  categoryList: [],
  curCategory: "",
  chooseHandle: () => {},
};

export default NavScroll;
