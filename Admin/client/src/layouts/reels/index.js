import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { BASEURL } from "API";
import { IMG } from "API";

function ReelsTable() {
  const [reelsData, setReelsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedReel, setSelectedReel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [form] = Form.useForm();
  const [editFile, setEditFile] = useState();
  const [file, setFile] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredReels, setFilteredReels] = useState([]);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(`${BASEURL}/reels`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReelsData(data);
        setFilteredReels(data);
      });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      reelName: record.reelName,
      reelUrl: record.reelUrl,
    });
    setSelectedReel(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${BASEURL}/reels/${record?.id}`);
      if (response.status === 200) {
        message.success("Reel Deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting reel:", error.message);
    }
  };

  const handleUpdateReel = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", editFile);

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.put(`${BASEURL}/reels/${selectedReel?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setEditModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Reel updated successfully");
      } else {
        console.error("Failed to update reel");
        message.error("Failed to update reel");
      }
    } catch (error) {
      console.error("Error updating reel:", error);
      message.error("Error updating reel");
    }
  };

  const handleView = (record) => {
    fetch(`http://localhost:5000/api/reels/getReels/${record._id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedReel(data.data);
        setModalVisible(true);
      })
      .catch((error) => console.error("Error fetching reel details:", error));
  };

  const handleNewReel = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleAddReel = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("reelName", values.reelName);
      formData.append("reelUrl", values.reelUrl);
      formData.append("file", file);

      const response = await axios.post(`${BASEURL}/reels`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setAddModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Reel added successfully");
      } else {
        console.error("Failed to add reel");
        message.error("Failed to add reel");
      }
    } catch (error) {
      console.error("Error adding reel:", error);
      message.error("Error Adding reel");
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

    const filtered = reelsData.filter((reel) =>
      reel.reelName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredReels(filtered);
  };

  const columns = [
    {
      title: "Reel Name",
      dataIndex: "reelName",
      key: "reelName",
    },
    {
      title: "URL",
      dataIndex: "reelUrl",
      key: "reelUrl",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Reel
        </Button>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "reelThumbnail",
      key: "reelThumbnail",
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
        placeholder="Search Reel by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleNewReel}>
          Add Reel
        </Button>

        <Table style={{ overflowX: "auto" }} dataSource={filteredReels} columns={columns} />

        <Modal
          title={selectedReel ? selectedReel.reelName : "Reel Details"}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedReel && (
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Reel :</h3>
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(selectedReel.reelUrl, "_blank")}
                    >
                      View Reel
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Thumbnail:</h3>
                    <img src={selectedReel.reelThumbnail} alt="Reel Thumbnail" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        <Modal
          title={addModalVisible ? "Add Reel" : "Update Reel"}
          visible={addModalVisible || editModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Reel Name" name="reelName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="reelUrl" name="reelUrl" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Reel Thumbnail Image"
              name="reelThumbnail"
              value={file}
              rules={[
                {
                  required: true,
                  message: "Please enter the reel thumbnail image",
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
              onClick={editModalVisible ? handleUpdateReel : handleAddReel}
              type="primary"
              htmlType="submit"
            >
              {editModalVisible ? "Update Reel" : "Add Reel"}
            </Button>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default ReelsTable;
