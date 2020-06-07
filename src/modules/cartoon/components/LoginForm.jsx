import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = ({toLogin}) => {
  return (
    <div className="Login-components-wrapper">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={toLogin}
      >
        <Form.Item
          name="phoneNo"
          rules={[{ required: true, message: "请输入手机号!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">忘记密码</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登 录
          </Button>
          或 <a href="">立即注册！</a>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  toLogin: PropTypes.func
};

export default Login;
