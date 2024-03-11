import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { BASEURL, IMG } from "API";
import TextArea from "antd/es/input/TextArea";

const CoursesTable = () => {
  const [courseData, setCourseData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [form] = Form.useForm();
  const [editFile, setEditFile] = useState();
  const [file, setFile] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [addUploadedFileName, setAddUploadedFileName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${BASEURL}/course`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCourseData(data);
        setFilteredCourse(data);
      });
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      exclyUrl: record.exclyUrl,
    });
    setSelectedCourse(record);
    setEditModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${BASEURL}/course/${record?.id}`);
      if (response.status === 200) {
        message.success("Course Deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("file", editFile);

      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await axios.put(`${BASEURL}/course/${selectedCourse?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setEditModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Course updated successfully");
      } else {
        console.error("Failed to update course");
        message.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course: ", error);
      message.error("Error updating course");
    }
  };

  const handleNewCourse = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleAddCourse = async () => {
    try {
      const validatedValues = await form.validateFields();
      const formData = new FormData();
      formData.append("file", file);
      for (const key in validatedValues) {
        if (key !== "file") {
          formData.append(key, validatedValues[key]);
        }
      }
      // console.log(formData);
      const response = await axios.post(`${BASEURL}/course`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setAddModalVisible(false);
        fetchData();
        form.resetFields();
        message.success("Course added successfully");
      } else {
        console.error("Failed to add course");
        message.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course: ", error);
      message.error("Error Adding course");
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

    const filtered = courseData.filter((course) =>
      course.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCourse(filtered);
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Excly URL",
      dataIndex: "exclyUrl",
      key: "exclyUrl",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Course
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
        placeholder="Search course by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleNewCourse}>
          Add Course
        </Button>

        <Table style={{ overflowX: "auto" }} dataSource={filteredCourse} columns={columns} />

        <Modal
          title={selectedCourse ? selectedCourse.name : "Course Details"}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedCourse && (
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Course :</h3>
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(selectedCourse.exclyUrl, "_blank")}
                    >
                      View Course
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <h3>Thumbnail:</h3>
                    <img src={`${IMG}${selectedCourse.thumbnail}`} alt="Course Thumbnail" />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        <Modal
          title={addModalVisible ? "Add Course" : "Update Course"}
          visible={addModalVisible || editModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Course Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Course Description" name="description" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Excly Url" name="exclyUrl" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Course Thumbnail Image"
              name="thumbnail"
              value={file}
              rules={[
                {
                  required: true,
                  message: "Please enter the course thumbnail image",
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
              onClick={editModalVisible ? handleUpdateCourse : handleAddCourse}
              type="primary"
              htmlType="submit"
            >
              {editModalVisible ? "Update Course" : "Add Course"}
            </Button>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default CoursesTable;
