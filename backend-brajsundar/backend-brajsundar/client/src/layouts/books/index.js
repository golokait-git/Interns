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
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
// import { EyeOutlined } from "@ant-design/icons";
import "./index.css";
function BooksTable() {
  const [booksData, setBooksData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFile, setEditFile] = useState();
  const [editUploadedFileName, setEditUploadedFileName] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch("http://localhost:5000/api/books/getBooks")
      .then((response) => response.json())
      .then((data) => {
        setBooksData(data.data);
        setFilteredBooks(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const columns = [
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "Book Link",
      dataIndex: "bookLink",
      key: "bookLink",
      render: (text) => (
        <Button
          type="primary"
          // style={{ background: "#228B22", color: "white" }}
          onClick={() => window.open(text, "_blank")}
        >
          View Book
        </Button>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Thumbnail",
      dataIndex: "bookThumbnail",
      key: "bookThumbnail",
      render: (text) => (
        <img src={text} alt="bookThumbnail" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      title: "Prebook",
      dataIndex: "preBook",
      key: "preBook",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          {/* <Button
            type="primary"
            style={{ background: "#228B22" }}
            onClick={() => handleView(record)}
          >
            View
          </Button> */}
          <Button
            type="primary"
            // style={{ background: "lightblue", color: "white" }}
            onClick={() => handleEdit(record)}
          >
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

  const handleView = (record) => {
    // Fetch book details by ID
    fetch(`http://localhost:5000/api/books/getBooks/${record._id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedBook(data.data);
        console.log(data.data);
        setModalVisible(true);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  };
  const fileSelected2 = (info) => {
    console.log(info);
    const fileList = [...info.fileList];
    console.log(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setFile(file);
      setUploadedFileName(file.name); // Set the uploaded file name
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    form.resetFields(); // Reset form fields in the "Add New Book" modal
    setFile(null); // Reset the file state
  };
  const handleAddNew = () => {
    form.resetFields(); // Reset form fields`
    setAddModalVisible(true);
  };

  const handleEdit = (record) => {
    // Fetch book details by ID

    fetch(`http://localhost:5000/api/books/getBooks/${record._id}`)
      .then((response) => response.json())
      .then((data) => {
        const bookData = data.data;

        // Open the add modal with the selected book's data pre-filled for editing
        form.setFieldsValue({
          bookName: bookData.bookName,
          bookLink: bookData.bookLink,
          bookDetail: bookData.bookDetail,
          country: bookData.country,
          preBook: bookData.preBook,
          bookThumbnail: bookData.thumbnail,
        });

        // Assuming 'bookThumbnail' is the file field
        setFile(bookData.bookThumbnail);
        setSelectedBook(bookData);
        setEditModalVisible(true);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  };
  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    form.resetFields(); // Reset form fields in the "Edit Book" modal
    setEditFile(null); // Reset the file state for edit modal
  };
  const fileSelectedForEdit = (info) => {
    const fileList = [...info.fileList];
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setEditFile(file);
      setEditUploadedFileName(file.name); // Set the uploaded file name for edit modal
    }
  };
  const handleEditFormSubmit = async () => {
    try {
      const validatedValues = await form.validateFields();

      const formData = new FormData();
      formData.append("bookThumbnail", editFile);
      for (const key in validatedValues) {
        if (key !== "bookThumbnail") {
          formData.append(key, validatedValues[key]);
        }
      }

      const response = await axios.put(
        `http://localhost:5000/api/books/updateBook/${selectedBook?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Book edited successfully:", data.UpdateBook);
        setEditModalVisible(false);
        fetchData();
        form.resetFields(); // Reset the form fields
        setEditFile(null);
        // You may want to update the booksData state with the new data here
      } else {
        console.error("Failed to edit book");
      }
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };
  const handleDelete = (record) => {
    fetch(`http://localhost:5000/api/books/deleteBook/${record?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete book with ID ${record._id}`);
        }
        fetchData();
        console.log(`Book with ID ${record._id} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting book:", error.message);
      });
  };

  const fileSelected = (info) => {
    console.log(info);
    const fileList = [...info.fileList];
    console.log(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setFile(file);
      setUploadedFileName(file.name); // Set the uploaded file name
    }
  };

  const handleFormSubmit = async () => {
    try {
      const validatedValues = await form.validateFields();

      const formData = new FormData();
      formData.append("bookThumbnail", file);

      // Append other form values to formData
      for (const key in validatedValues) {
        if (key !== "bookThumbnail") {
          formData.append(key, validatedValues[key]);
        }
      }
      console.log(formData);
      const response = await axios.post("http://localhost:5000/api/books/uploadBook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Book added successfully:", data.newBook);
        setAddModalVisible(false);
        fetchData();
        form.resetFields(); // Reset the form fields
        setFile(null);
        // You may want to update the booksData state with the new data here
      } else {
        console.error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = booksData.filter((book) =>
      book.bookName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Input
          placeholder="Search Book by name"
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" onClick={handleAddNew} style={{ float: "right", margin: "10px" }}>
          Add New
        </Button>
        <Table style={{ overflowX: "auto" }} dataSource={filteredBooks} columns={columns} />
        <Modal
          title={selectedBook ? selectedBook.bookName : "Book Details"}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
          className="book-details-modal"
        >
          {selectedBook && (
            <div className="book-details-container">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3 className="book-details-title">Book :</h3>
                    <Button
                      className="view-button"
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(selectedBook.bookLink, "_blank")}
                    >
                      View Book
                    </Button>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <h3 className="book-details-title">Country:</h3>
                    <p className="book-details-text">{selectedBook.country}</p>
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <div>
                    <h3 className="book-details-title">Prebook:</h3>
                    <p className="book-details-text">{selectedBook.prebook}</p>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="thumbnail-container">
                    <h3 className="book-details-title">Thumbnail:</h3>
                    <img
                      className="thumbnail-image"
                      src={selectedBook.bookThumbnail}
                      alt="Thumbnail"
                    />
                  </div>
                </Col>
              </Row>
              <div>
                <h2 className="book-details-title">Book Detail:</h2>
                <p className="book-details-text">{selectedBook.detail}</p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title={selectedBook ? selectedBook.bookName : "Add New Book"}
          visible={addModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Book Name" name="bookName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Book Link" name="bookLink" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Book Detail" name="bookDetail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Prebook" name="preBook" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Book Thumbnail Image"
              name="bookThumbnail"
              rules={[
                {
                  required: true,
                  message: "Please enter the book thumbnail image",
                },
              ]}
            >
              <Upload onChange={fileSelected} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {file && <div style={{ color: "green" }}>Uploaded File: {uploadedFileName}</div>}
            </Form.Item>
            <Button onClick={handleFormSubmit} type="primary" htmlType="submit">
              Add Book
            </Button>
          </Form>
        </Modal>

        <Modal
          title={selectedBook ? selectedBook.bookName : "Edit Book"}
          visible={editModalVisible}
          onCancel={handleEditModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Book Name" name="bookName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Book Link" name="bookLink" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Book Detail" name="bookDetail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Country" name="country" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Prebook" name="preBook">
              <Input />
            </Form.Item>
            <Form.Item
              label="Book Thumbnail Image"
              name="bookThumbnail"
              rules={[
                {
                  required: false,
                  message: "Please enter the book thumbnail image",
                },
              ]}
            >
              <Upload onChange={fileSelectedForEdit} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {editFile ? (
                <div style={{ color: "green" }}>Uploaded File: {editUploadedFileName}</div>
              ) : (
                ""
              )}
            </Form.Item>
            <Button onClick={handleEditFormSubmit} type="primary" htmlType="submit">
              Add Book
            </Button>
          </Form>
        </Modal>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default BooksTable;
