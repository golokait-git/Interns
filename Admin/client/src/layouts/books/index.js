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
  Select,
} from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import "./index.css";
import { BASEURL, IMG } from "API";
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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [bookLinks, setBookLinks] = useState({});
  const [bookList, setbookList] = useState([{ id: 1, country: "", bookLink: "" }]);
  const [selectedBookForLinks, setSelectedBookForLinks] = useState(null);
  const [addLinksModalVisible, setAddLinksModalVisible] = useState(false);
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia (Federated States of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom of Great Britain and Northern Ireland",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleAddItem = () => {
    const newItem = { id: bookList.length + 1, country: "", bookLink: "" };
    setbookList([...bookList, newItem]);
    console.log(bookList);
  };

  const handleSelectChange = (value, itemId) => {
    const updatedBookList = bookList.map((item) =>
      item.id === itemId ? { ...item, country: value } : item
    );
    setbookList(updatedBookList);
  };

  const handleInputChange = (e, itemId) => {
    const updatedBookList = bookList.map((item) =>
      item.id === itemId ? { ...item, bookLink: e.target.value } : item
    );
    setbookList(updatedBookList);
  };

  const { Option } = Select;
  const fetchData = () => {
    fetch(`${BASEURL}/book`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBooksData(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleAddLinks = (record) => {
    setSelectedBookForLinks(record);
    console.log(record);
    setAddLinksModalVisible(true);
    form.setFieldsValue({
      bookId: record.id, // Assuming 'id' is the field in your form for bookId
    });
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
        <Button type="primary" onClick={() => window.open(text, "_blank")}>
          View Book
        </Button>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "bookThumbnail",
      key: "bookThumbnail",
      render: (text) => (
        <img src={`${IMG}${text}`} alt="bookThumbnail" style={{ width: "50px", height: "50px" }} />
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
          <Button type="primary" onClick={() => handleAddLinks(record)}>
            Add Links
          </Button>
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
  const handleView = (record) => {
    // Fetch book details by ID
    fetch(`${BASEURL}/book/${record._id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedBook(data);
        setModalVisible(true);
      })
      .catch((error) => console.error("Error fetching book details: ", error));
  };
  const fileSelected2 = (info) => {
    // console.log(info);
    const fileList = [...info.fileList];
    // console.log(fileList);
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

  const handleEdit = async (record) => {
    try {
      const response = await axios.get(`${BASEURL}/book/${record.id}`);
      const bookData = response.data;
      console.log(bookData);

      form.setFieldsValue({
        bookName: bookData.bookName,
        bookLink: bookData.bookLink,
        bookDetail: bookData.bookDetail,
        country: bookData.country,
        preBook: bookData.preBook,
        bookThumbnail: bookData.bookThumbnail,
      });

      setFile(bookData.file);
      setSelectedBook(bookData);
      fetchData();
      setEditModalVisible(true);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
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
      formData.append("file", editFile);
      for (const key in validatedValues) {
        if (key !== "file") {
          formData.append(key, validatedValues[key]);
        }
      }

      const response = await axios.put(`${BASEURL}/book/${selectedBook?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.reload();
      if (response.status === 200) {
        const data = response.data;
        // console.log("Book edited successfully:", data.UpdateBook);
        alert("Book edited successfully:", data.UpdateBook);
        setEditModalVisible(false);
        form.resetFields(); // Reset the form fields
        setEditFile(null);
        fetchData();
        // You may want to update the booksData state with the new data here
      } else {
        console.error("Failed to edit book");
      }
      fetchData();
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };
  const handleDelete = async (record) => {
    try {
      // console.log(record?.id);

      const response = await axios.delete(`${BASEURL}/book/${record?.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response);

      if (response.status == 200) {
        alert("Book Deleted Successfully");
      } else {
        throw new Error(`Failed to delete book with ID ${record?.id}`);
      }

      fetchData();
    } catch (error) {
      console.error("Error deleting book: ", error.message);
    }
  };

  const fileSelected = (info) => {
    // console.log(info);
    const fileList = [...info.fileList];
    // console.log(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setFile(file);
      setUploadedFileName(file.name); // Set the uploaded file name
    }
  };

  const handleAddLinksFormSubmit = async (bookId) => {
    try {
      // Validate the form fields
      console.log("hey");
      const validatedValues = await form.validateFields();
      console.log(validatedValues);

      const linksArray = bookList.map((item) => ({
        country: item.country,
        link: item.bookLink,
      }));

      const linksData = { ...validatedValues, bookLinks: linksArray };
      console.log("Links data:", linksData);
      const bookLinks = linksData.bookLinks;
      const response = await axios.post(`${BASEURL}/addBookLinks/${bookId}`, bookLinks, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const savedBookLinks = response.data;
        console.log("Book links added successfully:", savedBookLinks);
        setAddLinksModalVisible(false);
        form.resetFields();
        return savedBookLinks;
      }
    } catch (error) {
      console.error("Error adding links:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const validatedValues = await form.validateFields();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("books", bookList);

      for (const key in validatedValues) {
        if (key !== "file") {
          formData.append(key, validatedValues[key]);
        }
      }
      console.log(formData.get("bookLinks"));
      const response = await axios.post(`${BASEURL}/book`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData);

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // console.log("Book added successfully:", data);
        alert("Book Added Successfully");
        setAddModalVisible(false);
        fetchData();
        form.resetFields(); // Reset the form fields
        setbookList([{ id: 1, country: "", bookLink: "" }]);
        window.location.reload();
        setFile(null);
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
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    // Clear previous book link for the selected country
    setBookLinks((prevLinks) => {
      const updatedLinks = { ...prevLinks };
      delete updatedLinks[selectedCountry];
      return updatedLinks;
    });
  };

  const handleBookLinkChange = (value) => {
    setBookLinks((prevLinks) => ({
      ...prevLinks,
      [selectedCountry]: value,
    }));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Input
        placeholder="Search Book by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div>
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
          onCancel={() => {
            handleModalCancel();
            setbookList([{ id: 1, country: "", bookLink: "" }]);
          }}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Book Name" name="bookName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Book Detail"
              name="bookDetail"
              rules={[{ required: true, message: "Please enter the book detail" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Prebook"
              name="preBook"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
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
          title={`Add Links to ${selectedBookForLinks?.bookName || "Book"}`}
          visible={addLinksModalVisible}
          onCancel={() => {
            setAddLinksModalVisible(false);
            setbookList([{ id: 1, country: "", bookLink: "" }]); // Reset bookList on modal close
          }}
          footer={[
            <Button key="cancel" onClick={() => setAddLinksModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleAddLinksFormSubmit(selectedBookForLinks?.id)}
            >
              Add Links
            </Button>,
          ]}
        >
          <Form form={form}>
            {bookList.map((item) => (
              <div key={item.id} style={{ marginBottom: "10px" }}>
                <Select
                  style={{ width: 120, marginRight: "11px" }}
                  value={item.country} // Assuming `item.country` is the selected country
                  onChange={(value) => handleSelectChange(value, item.id)} // Assuming `handleSelectChange` function exists
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countries.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
                <Input
                  style={{ width: "70%", marginRight: "10px" }}
                  placeholder="Enter value"
                  value={item.bookLink}
                  onChange={(e) => handleInputChange(e, item.id)}
                />
              </div>
            ))}
            {/* <Form.Item
              label="Prebook"
              name="preBook"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item> */}
            <Button type="primary" onClick={handleAddItem}>
              Add
            </Button>
          </Form>
        </Modal>

        {/* Edit Modal  */}
        <Modal
          title={selectedBook ? selectedBook.bookName : "Edit Book"}
          open={editModalVisible}
          onCancel={handleEditModalCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item label="Book Name" name="bookName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Book Detail" name="bookDetail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {/* <Form.Item label="Country" name="country" rules={[{ required: true }]}>
              <Input />
            </Form.Item> */}
            {/* <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
              {countries.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              label="Prebook"
              name="preBook"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
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
              Edit Book
            </Button>
          </Form>
        </Modal>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default BooksTable;
