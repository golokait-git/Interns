import React, { useEffect, useState } from "react";
import {
  Upload,
  Row,
  Col,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Image as AntImage,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";

function ArticleTabel() {
  const [articleData, setArticleData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredArticle, setFilteredArticle] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles/getArticles");
      setArticleData(response.data.data);
      setFilteredArticle(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Thumbnail Img",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img src={text} alt="thumbnail" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            style={{ background: "#D22B2B", color: "white" }}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalCancel = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleAddNew = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      title: record.title,
      content: record.content,
    });
    setSelectedArticle(record);
    setEditModalVisible(true);
  };

  const handleEditFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("thumbnail", editFile);
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.put(
        `http://localhost:5000/api/articles/updateArticle/${selectedArticle._id}`,
        formData
      );
      if (response.status === 200) {
        setEditModalVisible(false);
        fetchData();
        form.resetFields();
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/articles/deleteArticle/${record._id}`
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting article:", error.message);
    }
  };

  const fileSelected = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setFile(file);
      setAddUploadedFileName(file.name);
    }
  };

  const fileSelectedForEdit = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setEditFile(file);
      setEditUploadedFileName(file.name);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("thumbnail", file);
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.post(
        "http://localhost:5000/api/articles/uploadArticle",
        formData
      );
      if (response.status === 200) {
        setAddModalVisible(false);
        fetchData();
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = articleData.filter((article) =>
      article.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredArticle(filtered);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Input
          placeholder="Search Article by name"
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleAddNew} style={{ float: "right", margin: "10px" }}>
          Add New
        </Button>
        <Table style={{ overflowX: "auto" }} dataSource={filteredArticle} columns={columns} />
        <Modal
          title={addModalVisible ? "Add Article" : "Update Article"}
          visible={addModalVisible || editModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="content" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Thumbnail Image"
              name="thumbnail"
              rules={[
                {
                  required: false,
                  message: "Please enter the product thumbnail image",
                },
              ]}
            >
              <Upload
                onChange={editModalVisible ? fileSelectedForEdit : fileSelected}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {editModalVisible && editFile && (
                <div style={{ color: "green" }}>Uploaded File: {editUploadedFileName}</div>
              )}
              {!editModalVisible && file && (
                <div style={{ color: "green" }}>Uploaded File: {addUploadedFileName}</div>
              )}
            </Form.Item>

            <Button
              onClick={editModalVisible ? handleEditFormSubmit : handleFormSubmit}
              type="primary"
              htmlType="submit"
            >
              {editModalVisible ? "Update Article" : "Add Article"}
            </Button>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default ArticleTabel;
