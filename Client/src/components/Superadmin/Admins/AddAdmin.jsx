import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddAdmin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
        roles: values.roles,
      };

      const result = await axios.post(
        "http://localhost:5000/auth/add_admin",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Server Response:", result);

      if (result.data.Status === 200) {
        // Reset form or perform other actions on success
      } else {
        alert("Admin added successfully!");
        window.location.reload(); // Refresh the page to reflect changes
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding admin.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <Form form={form} onFinish={onFinish} className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Form.Item
            name="email"
            className="py-auto px-4 rounded-xl"
            rules={[
              {
                required: true,
                message: "Please enter a valid email address!",
                type: "email",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="py-auto px-4 rounded-xl"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="py-auto px-4 rounded-xl"
            rules={[
              {
                required: true,
                message: "Please enter the password!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="py-auto px-4 rounded-xl"
            />
          </Form.Item>
          <Form.Item
            name="roles"
            className="py-auto px-4 rounded-xl"
            rules={[
              {
                required: true,
                message: "Please select a role!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select a role"
              className="py-auto rounded-xl"
            >
              <Option value="superadmin">Super Admin</Option>
              <Option value="admin1">Admin 1</Option>
              <Option value="admin2">Admin 2</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-center">
              <Button
                type="button"
                htmlType="submit"
                className="w-full bg-purple-500 hover:bg-purple-700 hover:scale-105 text-white font-bold mx-4 rounded-xl transition duration-300"
              >
                Add Admin
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddAdmin;
