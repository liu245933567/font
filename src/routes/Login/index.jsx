import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import { Radio } from "antd";
// import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

@connect(
  (state) => {
    return {
      sectionList: state.cartoon.sectionList,
      queryCartoonDetailParams: state.cartoon.queryCartoonDetailParams,
    };
  },
  (dispatch) => ({
    dispatchGetSectionList(payload) {
      dispatch({
        type: "cartoon/getCartoonDeatil",
        payload,
      });
    },
    dispatchGetSectionDeatil(payload) {
      dispatch({
        type: "cartoon/getSectionDeatil",
        payload,
      });
    },
  })
)
class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchGetSectionList();
  }

  render() {
    return (
      <div className="Account-page-wrapper">
        <div className="form-wrapper">
          <Radio.Group defaultValue="login" size="large">
            <Radio.Button value="login">登录</Radio.Button>
            <Radio.Button value="register">注册</Radio.Button>
          </Radio.Group>
          {/* <LoginForm /> */}
          <RegisterForm />
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  sectionList: PropTypes.array,
  dispatchGetSectionList: PropTypes.func,
  dispatchGetSectionDeatil: PropTypes.func,
  history: PropTypes.object,
  queryCartoonDetailParams: PropTypes.object,
};

export default Account;
