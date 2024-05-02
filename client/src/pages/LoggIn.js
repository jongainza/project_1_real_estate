import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import {
  signedInUser,
  signFailure,
  signInFailure,
} from "../redux/user/userSlice";

const Loggin = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if state contains username and password
  const initialValues =
    state && state.username && state.password
      ? { username: state.username, password: state.password }
      : {};

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/auth/loggin", values);
      console.log({ response });
      if (response.status === 200) {
        console.log("YOU ARE IN!!!");
        dispatch(
          signedInUser({
            currentUser: {
              id: response.data.user.id,
              username: response.data.user.username,
              email: response.data.user.email,
              photo: response.data.user.photo,
            },
            _token: response.data._token,
          })
        );
        navigate("/about", {});
      } else {
        dispatch(
          signInFailure({
            currentUser: {
              error: response.error.message,
            },
            _token: response.data._token,
          })
        );
        console.error("Error:", response.error.message);
        message.error(response.error.message); // Display error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong"); // Display generic error message to the user
    }
  };
  // Your form submission logic

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

export default Loggin;
