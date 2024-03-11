import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { BASEURL, IMG } from "API";
import TextArea from "antd/es/input/TextArea";

const ChoachingTable = () => {
  const [coachingData, setCoachingData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCoaching, setSelectedCoaching] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [form] = Form.useForm();
  const [editFile, setEditFile] = useState();
  const [file, setFile] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredCoaching, setFilteredCoaching] = useState([]);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${BASEURL}/coaching`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoachingData(data);
        setFilteredCoaching(data);
      });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      exclyUrl: record.exclyUrl,
    });
    setSelectedCoaching(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    console.log(record);
    try {
      console.log(record?._id);
      const response = await axios.delete(`${BASEURL}/coaching/${record?.id}`);
      if (response.status === 200) {
        message.success("Coaching Deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting coaching:", error.message);
    }
  };

  const handleUpdateCoaching = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", editFile);

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.put(`${BASEURL}/coaching/${selectedCoaching?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setEditModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Coaching updated successfully");
      } else {
        console.error("Failed to Update Coaching");
        message.error("Failed to Update Coaching");
      }
    } catch (error) {
      console.error("Error updating coaching: ", error);
      message.error("Error updating coaching");
    }
  };

  const handleNewCoaching = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleAddCoaching = async () => {
    try {
      const validatedValues = await form.validateFields();
      const formData = new FormData();
      formData.append("file", file);
      for (const key in validatedValues) {
        if (key !== "file") {
          formData.append(key, validatedValues[key]);
        }
      }
      console.log(formData);
      const response = await axios.post(`${BASEURL}/coaching`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setAddModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Coaching added successfully");
      } else {
        console.error("Failed to Add Coaching");
        message.error("Failed to Add Coaching");
      }
    } catch (error) {
      console.error("Error adding coaching: ", error);
      message.error("Error Adding coaching");
    }
  };

  const fileSelectedForEdit = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setEditFile(file);
      setEditUploadedFileName(file.name);
    }
  };

  const fileSelected = (info) => {
    const fileList = [...info.fileList];
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = coachingData.filter((coaching) =>
      coaching.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCoaching(filtered);
  };

  const columns = [
    {
      title: "Coaching Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Coaching Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Excly URL",
      dataIndex: "exclyUrl",
      key: "exclyUrl",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Coaching
        </Button>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img src={`${IMG}${text}`} alt="Thumbnail" style={{ width: "50px", height: "50px" }} />
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Input
        placeholder="Search Coaching by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button
          type="primary"
          onClick={handleNewCoaching}
          style={{ float: "right", margin: "10px" }}
        >
          Add Coaching
        </Button>

        <Table style={{ overflowX: "auto" }} dataSource={filteredCoaching} columns={columns} />

        <Modal
          title={selectedCoaching ? selectedCoaching.name : "Coaching Details"}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedCoaching && (
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Coaching :</h3>
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(selectedCoaching.exclyUrl, "_blank")}
                    >
                      View Coaching
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Thumbnail:</h3>
                    <img src={`${IMG}${selectedCoaching.thumbnail}`} alt="Coaching Thumbnail" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        <Modal
          title={addModalVisible ? "Add Coaching" : "Update Coaching"}
          visible={addModalVisible || editModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Coaching Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Coaching Description" name="description" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Excly Url" name="exclyUrl" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Coaching Thumbnail Image"
              name="thumbnail"
              value={file}
              rules={[
                {
                  required: false,
                  message: "Please enter the coaching thumbnail image",
                },
              ]}
            >
              <Upload
                onChange={editModalVisible ? fileSelectedForEdit : fileSelected}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>{selectedFileName || "Select Image"}</Button>
              </Upload>

              {editModalVisible && editFile && (
                <div style={{ color: "green" }}>Uploaded File: {editUploadedFileName}</div>
              )}
            </Form.Item>

            <Button
              onClick={editModalVisible ? handleUpdateCoaching : handleAddCoaching}
              type="primary"
              htmlType="submit"
            >
              {editModalVisible ? "Update Coaching" : "Add Coaching"}
            </Button>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ChoachingTable;
