import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { BASEURL, IMG } from "API";
import TextArea from "antd/es/input/TextArea";

const Workshop = () => {
  const [workshopData, setWorkshopData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [form] = Form.useForm();
  const [editFile, setEditFile] = useState();
  const [file, setFile] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredWorkshop, setFilteredWorkshop] = useState([]);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${BASEURL}/workshop`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkshopData(data);
        setFilteredWorkshop(data);
      });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      exclyUrl: record.exclyUrl,
    });
    setSelectedWorkshop(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${BASEURL}/workshop/${record?.id}`);
      if (response.status === 200) {
        message.success("Workshop Deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting workshop:", error.message);
    }
  };

  const handleUpdateWorkshop = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", editFile);

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.put(`${BASEURL}/workshop/${selectedWorkshop?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setEditModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Workshop updated successfully");
      } else {
        console.error("Failed to update workshop");
        message.error("Failed to update workshop");
      }
    } catch (error) {
      console.error("Error updating workshop: ", error);
      message.error("Error updating workshop");
    }
  };

  const handleNewWorkshop = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleAddWorkshop = async () => {
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
      const response = await axios.post(`${BASEURL}/workshop`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setAddModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Workshop added successfully");
      } else {
        console.error("Failed to add workshop");
        message.error("Failed to add workshop");
      }
    } catch (error) {
      console.error("Error adding workshop: ", error);
      message.error("Error Adding workshop");
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

    const filtered = workshopData.filter((workshop) =>
      workshop.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredWorkshop(filtered);
  };

  const columns = [
    {
      title: "Workshop Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Workshop Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Excly URL",
      dataIndex: "exclyUrl",
      key: "exclyUrl",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Workshop
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
        placeholder="Search Workshop by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button
          type="primary"
          onClick={handleNewWorkshop}
          style={{ float: "right", margin: "10px" }}
        >
          Add Workshop
        </Button>

        <Table style={{ overflowX: "auto" }} dataSource={filteredWorkshop} columns={columns} />

        <Modal
          title={selectedWorkshop ? selectedWorkshop.name : "Workshop Details"}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedWorkshop && (
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Workshop :</h3>
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(selectedWorkshop.exclyUrl, "_blank")}
                    >
                      View Workshop
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Thumbnail:</h3>
                    <img src={`${IMG}${selectedWorkshop.thumbnail}`} alt="Workshop Thumbnail" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        <Modal
          title={addModalVisible ? "Add Workshop" : "Update Workshop"}
          visible={addModalVisible || editModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Workshop Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Workshop Description" name="description" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Excly Url" name="exclyUrl" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Workshop Thumbnail Image"
              name="thumbnail"
              value={file}
              rules={[
                {
                  required: true,
                  message: "Please enter the workshop thumbnail image",
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
              onClick={editModalVisible ? handleUpdateWorkshop : handleAddWorkshop}
              type="primary"
              htmlType="submit"
            >
              {editModalVisible ? "Update Workshop" : "Add Workshop"}
            </Button>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Workshop;
