import React from "react";
import { Menu } from "antd";
import PropTypes from "prop-types";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.history);
    const {
      handleClick,
      history
    } = this.props;
    if(history.location.pathname === '/resume'){
      return null;
    }

    return (
      <Menu
        className="Nav-wrapper"
        onClick={handleClick}
        selectedKeys={[history.location.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="/">我的漫画</Menu.Item>
      </Menu>
    );
  }
}

Nav.propTypes = {
  handleClick: PropTypes.func,
  history: PropTypes.object,
};
