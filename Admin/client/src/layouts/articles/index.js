import React, { useEffect, useState, Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
import { BASEURL } from "API";
import { IMG } from "API";

const ArticleTable = () => {
  const [articleData, setArticleData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredArticle, setFilteredArticle] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [state, setState] = useState("Hey");
  const [editFile, setEditFile] = useState(null);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(`${BASEURL}/article`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setArticleData(data);
        setFilteredArticle(data);
      });
  };

  const columns = [
    {
      title: "Thumbnail Img",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img src={`${IMG}${text}`} alt="thumbnail" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          dangerouslySetInnerHTML={{
            __html: text
          }}
        />
      ),
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
      description: record.description,
    });
    setSelectedArticle(record);
    setEditModalVisible(true);
  };

  const handleEditFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", editFile);
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.put(`${BASEURL}/article/${selectedArticle?.id}`, formData);
      if (response.status === 200) {
        setEditModalVisible(false);
        alert("Article Updated Successfully");
        fetchData();
        form.resetFields();
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${BASEURL}/article/${record?.id}`);
      if (response.status === 200) {
        alert("Article Deleted Successfully");
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

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Test" + values);
      console.log(description);
      const formData = new FormData();
      formData.append("title",values["title"])
      formData.append("description",description);
      formData.append("file", file);
      // for (const key in values) {
      //   formData.append(key, values[key]);
      // }
      const response = await axios.post(`${BASEURL}/article`, formData);
      if (response.status === 200) {
        setAddModalVisible(false);
        alert("Article Added Successfully");
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
            {/* <Form.Item label="Description" name="description" rules={[{ required: true }]}>
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input your description!" }]}
              style={{ height: "50%" }}
            >
              <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                  // You can store the "editor" and use it when needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={onEditorChange}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </Form.Item>
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
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
        {/*
        
        <Form form={form}>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
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
        </Modal> */}
      </div>
    </DashboardLayout>
  );
};
export default ArticleTable;
