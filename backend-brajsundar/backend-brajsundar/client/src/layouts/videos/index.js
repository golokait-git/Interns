import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";

function YoutubeVideosTable() {
  const [videosData, setVideosData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedVideo, setSelectedVideo] = useState(null); // New state for the selected video
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:5000/api/youtube/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideosData(data);
        setFilteredVideos(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleView = (record) => {
    window.open(record.video_url, "_blank");
  };

  const handleEdit = (record) => {
    console.log("Editing video:", record._id);
    // Fetch video by id
    fetch(`http://localhost:5000/api/youtube/videos/${record._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        const videoData = data;
        console.log(videoData);
        form.setFieldsValue({
          videoName: videoData.videoName,
          videoUrl: videoData.video_url,
          category: videoData.category,
        });
        setSelectedVideo(record);
        setEditModalVisible(true);
        console.log(editModalVisible);
      })
      .catch((error) => console.log("Error fetching video details: ", error));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleEditFormSubmit = async () => {
    try {
      const validatedValues = await form.validateFields();

      const formData = new FormData();
      formData.append("videoName", validatedValues.videoName);
      formData.append("category", validatedValues.category);
      formData.append("video_url", validatedValues.videoUrl);
      console.log(selectedVideo._id);
      const response = await axios.put(
        `http://localhost:5000/api/youtube/videos/${selectedVideo._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Video edited successfully:", data);
        setEditModalVisible(false);
        fetchData();
      } else {
        console.error("Failed to edit video");
      }
    } catch (error) {
      console.error("Error editing video:", error);
    }
  };

  const handleDelete = (record) => {
    fetch(`http://localhost:5000/api/youtube/videos/${record?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete video with ID ${record._id}`);
        }

        console.log(`video with ID ${record._id} deleted successfully`);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting video:", error.message);
      });
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
      formData.append("video_url", values.videoUrl);

      const response = await axios.post("http://localhost:5000/api/youtube/createVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Video Added Successfully");
        setModalVisible(false);
        fetchData();
      } else {
        console.log("Failed to Add Video");
      }
    } catch (error) {
      console.log("Failed:", error);
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

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Video Name",
      dataIndex: "videoName",
      key: "videoName",
    },
    {
      title: "Video URL",
      dataIndex: "video_url",
      key: "video_url",
      render: (text) => (
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Video
        </Button>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
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

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input />
          </Form.Item>
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

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}

export default YoutubeVideosTable;
