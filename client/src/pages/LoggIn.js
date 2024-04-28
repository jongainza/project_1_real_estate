import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const App = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  // Check if state contains username and password
  const initialValues =
    state && state.username && state.password
      ? { username: state.username, password: state.password }
      : {};

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/auth/loggin", values);
      // console.log({ response });
      if (response.status !== 200) {
        console.error("Error:", response.data.error.message);
        message.error(response.data.error.message); // Display error message to the user
      } else {
        let message = response.data.message;
        // console.log({ message });
        const _token = response.data._token;
        sessionStorage.setItem("_token", _token);
        navigate("/", {});
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong"); // Display generic error message to the user
    }
    // Your form submission logic
  };

  const onFinishFailed = (error) => {
    console.log("Failed:", error);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
