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
    dispatchToLogin(payload) {
      dispatch({
        type: "user/toLogin",
        payload,
      });
    }
  })
)
class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchToLogin({});
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
  dispatchToLogin: PropTypes.func,
  history: PropTypes.object
};

export default Account;
