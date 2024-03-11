import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { BASEURL } from "API";

function YoutubeVideosTable() {
  const [videosData, setVideosData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(`${BASEURL}/video`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVideosData(data);
        setFilteredVideos(data);
      });
  };

  // const handleView = (record) => {
  //   window.open(record.video_url, "_blank");
  // };

  const handleEdit = (record) => {
    // Fetch video by id
    fetch(`${BASEURL}/video/${record?.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        const videoData = data;
        console.log(videoData);
        form.setFieldsValue({
          videoName: videoData.videoName,
          videoUrl: videoData.videoUrl,
          category: videoData.category,
        });
        setSelectedVideo(record);
        setEditModalVisible(true);
        console.log(editModalVisible);
      })
      .catch((error) => console.log("Error fetching video details: ", error));
  };

  const handleEditModalCancel = () => {
    setEditingVideo(null);
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleEditFormSubmit = async () => {
    try {
      const validatedValues = await form.validateFields();
      const formData = new FormData();
      formData.append("videoName", validatedValues.videoName);
      formData.append("category", validatedValues.category);
      formData.append("videoUrl", validatedValues.videoUrl);
      console.log(selectedVideo?.id);
      const response = await axios.put(`${BASEURL}/video/${selectedVideo?.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Video edited successfully:", data);
        setEditModalVisible(false);
        form.resetFields();
        fetchData();
        message.success("Video Edited Successfully");
      } else {
        console.error("Failed to edit video");
      }
    } catch (error) {
      console.error("Error editing video:", error);
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${BASEURL}/video/${record?.id}`);

      if (response.status === 200) {
        console.log(`Video with ID ${record?.id} deleted successfully`);
        fetchData();
        message.success("Video Deleted Successfully");
      } else {
        console.error(`Failed to delete video with ID ${record?.id}`);
      }
    } catch (error) {
      console.error("Error deleting video:", error.message);
    }
  };

  const handleNewVideo = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleAddVideo = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("videoName", values.videoName);
      formData.append("category", values.category);
      formData.append("videoUrl", values.videoUrl);

      const response = await axios.post(`${BASEURL}/video`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(formData);

      if (response.status === 200) {
        console.log("Video Added Successfully");
        setModalVisible(false);
        fetchData();
        message.success("Video added successfully");
      } else {
        console.log("Failed to Add Video");
      }
    } catch (error) {
      console.log("Failed: ", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = videosData.filter((video) =>
      video.videoName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const columns = [
    {
      title: "Video Name",
      dataIndex: "videoName",
      key: "videoName",
    },
    {
      title: "Video URL",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Video
        </Button>
      ),
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    // },
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
        placeholder="Search Video by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleNewVideo}>
          Add Video
        </Button>
      </div>
      <Table dataSource={filteredVideos} columns={columns} />

      <Modal
        title="Add New Video"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form}>
          <Form.Item
            label="Video Name"
            name="videoName"
            rules={[{ required: true, message: "Please enter the video name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Video URL"
            name="videoUrl"
            rules={[
              { required: true, message: "Please enter the video URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input />
          </Form.Item> */}
          <Button type="primary" htmlType="submit" onClick={handleAddVideo}>
            Add Video
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Edit Video"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={[
          <Button key="cancel" onClick={handleEditModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditFormSubmit}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Video Name"
            name="videoName"
            rules={[{ required: true, message: "Please enter the video name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Video URL"
            name="videoUrl"
            rules={[
              { required: true, message: "Please enter the video URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

export default YoutubeVideosTable;
