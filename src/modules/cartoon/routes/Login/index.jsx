import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import { Radio } from "antd";
import LoginForm from "../../components/LoginForm";
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
    },
  })
)
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curType: "login",
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { curType } = this.state;
    return (
      <div className="Account-page-wrapper">
        <div className="form-wrapper">
          <Radio.Group
            defaultValue="login"
            size="large"
            onChange={(event) => {
              this.setState({
                curType: event.target.value,
              });
            }}
          >
            <Radio.Button value="login">登录</Radio.Button>
            <Radio.Button value="register">注册</Radio.Button>
          </Radio.Group>
          {curType === "login" ? (
            <LoginForm
              toLogin={(value) => {
                console.log(value);
                const {
                  phoneNo,
                  password
                } = value;
                this.props.dispatchToLogin({
                  phoneNo,
                  password
                });
              }}
            />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  dispatchToLogin: PropTypes.func,
  history: PropTypes.object,
};

export default Account;
