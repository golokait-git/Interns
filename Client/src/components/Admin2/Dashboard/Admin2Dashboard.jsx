import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Table, Input, Button, Space, Pagination } from "antd"; // Import Pagination from Ant Design
import axios from "axios";
import "./Admin2Dashboard.css";

const { Search } = Input;

function Admin2Dashboard() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Starting from page 1
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/getleaves")
      .then((response) => {
        if (response.data.Status) {
          setEmployeeData(response.data.Result);
          console.log(response.data.Result)
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while retrieving data:", error);
      });
  }, []);

  // Pagination logic
  const totalItems = employeeData.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = employeeData.slice(startIndex, endIndex);

  //SearchBar
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = currentData.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  //Approve Button
  const approveleave = (EmpLeaveID) => {
    axios
      .post(`http://localhost:5000/auth/approveleave/${EmpLeaveID}`)
      .then((response) => {
        if (response.data.Status) {
          const updatedEmployeeData = employeeData.map((employee) =>
            employee.EmpLeaveID === EmpLeaveID
              ? { ...employee, status: "Approve1" }
              : employee
          );
          alert("Leave Approved")
          axios
            .get("http://localhost:5000/auth/getleaves")
            .then((response) => {
              if (response.data.Status) {
                setEmployeeData(response.data.Result);
                
              } else {
                alert(response.data.Error);
              }
            })
            .catch((error) => {
              console.error("Error while retrieving data:", error);
            });
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while approving leave:", error);
      });
  };
  //Approve Button

  //Disapprove Button
  const disapproveleave = (EmpLeaveID) => {
    axios
      .post(`http://localhost:5000/auth/disapproveleave/${EmpLeaveID}`)
      .then((response) => {
        if (response.data.Status) {
          const updatedEmployeeData = employeeData.map((employee) =>
            employee.EmpLeaveID === EmpLeaveID
              ? { ...employee, status: "Approve" }
              : employee
          );
          alert("Leave Dispproved")
          axios
            .get("http://localhost:5000/auth/getleaves")
            .then((response) => {
              if (response.data.Status) {
                setEmployeeData(response.data.Result);
              } else {
                alert(response.data.Error);
              }
            })
            .catch((error) => {
              console.error("Error while retrieving data:", error);
            });
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error while approving leave:", error);
      });
  };

  const columns = [
    { title: "LeaveID", dataIndex: "EmpLeaveID", key: "EmpLeaveID", align: "center" },
    { title: "Name", dataIndex: "employee_name", key: "employee_name", align: "center" },
    { title: "Reason", dataIndex: "reason", key: "reason", align: "center" },
    { title: "Paid Leaves Remaining", dataIndex: "paid_leave", key: "paid_leave", align: "center" },
    { title: "Number Of Days", dataIndex: "number_of_days", key: "number_of_days", align: "center" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date", width: 120, render: formatDate, align: "center" },
    { title: "End Date", dataIndex: "end_date", key: "end_date", width: 120, render: formatDate, align: "center" },
    {
      title: "Actions",
      dataIndex: "EmpLeaveID",
      key: "actions",
      align: "center",
      render: (EmpLeaveID) => (
        <Space>
          <Button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-auto me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => approveleave(EmpLeaveID)}>
            Approve
          </Button>
          <Button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-auto me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => disapproveleave(EmpLeaveID)}>
            Disapprove
          </Button>
        </Space>
      ),
    },
  ];

  //Convert the Date JSON to DD/MM/YY format
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  //Convert the Date from JSON to DD/MM/YY format
  const handlelogout = () => {
    axios.get("http://localhost:5000/auth/logout").then((result) => {
      if (result.data.Status) {
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-gray-300 min-h-screen font-sans">
      <div className="container mx-auto bg-white">
        <div className="row">
          <div className="col">
            <div id="mainheader1" className="p-2 flex flex-col items-center justify-center shadow ">
              <h4 className="font-semibold text-4xl">Employee Management System</h4>
              <hr style={{ width: "50%", margin: "10px 0", color: "black" }} />
              <h4 className="font-semibold text-3xl">Admin2 Dashboard</h4>
            </div>
            <div className="table1">
              <div className="header">
                <div className="searchbar">
                  <Input
                    className="search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {/* <i id="searchicon" className="bi bi-search"></i> */}
                </div>
              </div>
              <div className="table-container">
              {filteredData.length > 0 ? (
                  <>
                    <Table
                      dataSource={filteredData}
                      columns={columns}
                      pagination={false} // Disable default pagination
                      bordered
                      size="middle"
                    />
                    <Pagination
                      current={pageNumber}
                      total={totalItems}
                      pageSize={itemsPerPage}
                      onChange={handlePageChange}
                      style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                  </>
                ) : (
                  <p>No leaves pending</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default Admin2Dashboard;
