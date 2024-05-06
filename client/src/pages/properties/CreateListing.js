import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Slider,
  Upload,
} from "antd";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const CreateListing = () => {
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="Info">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Street">
          <Input />
        </Form.Item>
        <Form.Item label="Number">
          <InputNumber />
        </Form.Item>
        <Form.Item label="City">
          <Input />
        </Form.Item>
        <Form.Item label="State">
          <Input />
        </Form.Item>
        <Form.Item label="Country">
          <Input />
        </Form.Item>
        <Form.Item label="Zip Code">
          <InputNumber min={0} max={100000000000000} step={100} />
        </Form.Item>
        <Form.Item label="Selling Price">
          <InputNumber min={10000} max={100000000000000} step={1000} />
        </Form.Item>
        <Form.Item label="Bedrooms">
          <Slider />
        </Form.Item>
        <Form.Item label="Bathrooms">
          <Slider />
        </Form.Item>
        <Form.Item label="Garage" name="disabled" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload Images
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <CreateListing />;
