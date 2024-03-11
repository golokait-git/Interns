import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Space, Modal, Form, Input, Table } from "antd";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:5000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }
  
  const handleDelete = (id) => {
    console.log(id)
    axios
      .delete(`http://localhost:5000/auth/delete_category/${id}`)
      .then((result) => {
        console.log(result)
        if (result.data.Status) {
          fetchData()
          // setCategory(category.filter((item) => item.id !== id));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        axios
          .post("http://localhost:5000/auth/add_category", values)
          .then((result) => {
            if (result.data.Status) {
              setCategory([...category, result.data.Result]);
              fetchData()
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-auto me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-5 bg-gray-200 font-sans">
      <div className="flex flex-col justify-between items-center mb-1">
        <h3 className="text-4xl font-bold mx-auto ">Teams List</h3>
        <div className="flex justify-end right-0 w-full">
        <Button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-[150px] px-5 py-auto me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={showModal}>
          Add Team
        </Button>
        </div>
      </div>
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <Table dataSource={category} columns={columns} />
      </div>
    </div>
  );
};

export default Category;
