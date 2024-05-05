import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "../../helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signedInUser } from "../../redux/user/userSlice";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const Profile = () => {
  const { currentUser, _token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const photoRef = useRef(null);
  const [formData, setFormData] = useState({
    id: null,
    _token: null,
    username: null,
    email: null,
    password: null,
    photo: null,
  });

  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(currentUser.photo);
  const [form] = Form.useForm();
  console.log({ fields: form.getFieldsValue().photo });
  useEffect(() => {
    form.setFieldsValue({
      username: currentUser.username,
      email: currentUser.email,
      photo: imageSrc,
    });
  }, [currentUser.username, currentUser.email, imageSrc, form]);

  const handleChange = (e) => {
    form.setFieldsValue({ [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setFormData({
      _token,
      username: form.getFieldsValue().username,
      email: form.getFieldsValue().email,
      password: form.getFieldsValue().password,
      photo: imageSrc,
    });
    console.log({ formData });
    try {
      console.log({ formData });
      const response = await axios.put(`/user/update`, formData);
      if (response.status === 201) {
        console.log("user updated");
        console.log({ response });
        dispatch(
          signedInUser({
            currentUser: {
              id: response.data.updatedUser.updatedUser.id,
              username: response.data.updatedUser.updatedUser.username,
              email: response.data.updatedUser.updatedUser.email,
              photo: response.data.updatedUser.updatedUser.photo,
            },

            _token,
          })
        );
        navigate("/");
      } else {
        console.error(response.error.message);
      }
    } catch (error) {
      console.error("somthing went wrong");
    }
  };

  return (
    <>
      <h1>Update Profile</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="update user"
        onFinish={handleSubmit}
        onChange={handleChange}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="User Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your User Name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: false,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm new Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: form.getFieldValue("password") !== undefined,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Profile Picture"
          tooltip="How do you want others to imagine you?"
        >
          <input
            type="file"
            ref={photoRef}
            hidden
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];

              if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setImageSrc(event.target.result);
                };
                reader.readAsDataURL(selectedFile);
              }
            }}
          />
          <img
            src={imageSrc}
            alt="profile avatar"
            onClick={() => photoRef.current.click()}
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1em",
              cursor: "pointer",
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Profile;
