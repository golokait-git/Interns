import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Input } from "antd";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { BASEURL } from "API";

function ReviewsTable() {
  const [reviewsData, setReviewsData] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(`${BASEURL}/review`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviewsData(data);
        setFilteredReviews(data);
      });
  };
  const handleDelete = async (record) => {
    fetch(`${BASEURL}/review/${record?.id}`, {
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
        alert("Deleted Review Successfully");
      })
      .catch((error) => {
        console.error("Error deleting book:", error.message);
      });
  };

  const columns = [
    {
      title: "Book Name",
      dataIndex: "BookId",
      key: "BookId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="danger"
          style={{ background: "#D22B2B", color: "white" }}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = reviewsData.filter((review) =>
      review.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Input
        placeholder="Search Review by name"
        value={searchInput}
        onChange={handleSearchInputChange}
        style={{ marginBottom: 16 }}
      />
      <div>
        <Table dataSource={filteredReviews} columns={columns} />
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default ReviewsTable;
