import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";
import { Table,Tag, Input } from "antd";
import axios from "axios";
// import ReactPaginate from "react-paginate";
import "./Admin1Approved.css";
// import "antd/dist/antd.css";
// import Sidebar from "../Sidenav/Supersidenav";
const { Search } = Input;

function Admin1Approved() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/getapproved")
      .then((response) => {
        if (response.data.Status) {
          setEmployeeData(response.data.Result);
          console.log(employeeData)
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while retrieving data:", error);
      });
  }, []);

  // const pageCount = Math.ceil(employeeData.length / itemsPerPage);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  // const startIndex = pageNumber * itemsPerPage;
  // const endIndex = (pageNumber + 1) * itemsPerPage;
  // const slicedData = employeeData.slice(startIndex, endIndex);

  const filteredData = employeeData
    .filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    // .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const columns = [
    { title: "EmpID", dataIndex: "emp_id", key: "emp_id",align: "center", },
    { title: "Name", dataIndex: "employee_name", key: "employee_name", align: "center", },
    { title: "Number Of Days", dataIndex: "number_of_days", key: "number_of_days", align: "center", },
    { title: "Leaves Remaining", dataIndex: "leaves_remaining", key: "leaves_remaining", align: "center", },
    // { title: "Start Date", dataIndex: "start_date", key: "start_date", align: "center", },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (text) => formatDate(text),
    },    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "Approve" ? "darkgreen" : ""}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
  <div className="bg-gray-300 min-h-screen font-sans overflow-x-auto">
    <div className="container mx-auto bg-white">
      <div className="row flex-nowrap">
        {/* <Sidebar/> */}
        <div className="col p-0 m-0">
          <div
            id="mainheader1"
            className="p-2 flex flex-col items-center justify-center shadow"
          >
            <h4 className="font-semibold text-4xl">Employee Management System</h4>
            <hr style={{ width: "50%", margin: "10px 0", color: "black" }} />
            <h4 className="font-semibold text-3xl">Admin1 Approved</h4>
          </div>
          <div className="table1">
            <div className="header">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="text-center w-full overflow-x-auto">
              {employeeData.length > 0 ? (
                <Table
                  dataSource={filteredData}
                  columns={columns}
                />
              ) : (
                <p>Leaves Not yet Approved</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default Admin1Approved;
