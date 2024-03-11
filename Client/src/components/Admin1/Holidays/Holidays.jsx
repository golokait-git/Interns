/*Holidays.jsx*/


import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Form, Input, Select,Table, Button, Space,Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import DatePicker from 'react-datepicker';
import "./Holidays.css";
// import "Holidays.css";// Create a separate CSS file for styling

const Holidays = () => {
  const [employee, setEmployee] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/holidays")
      .then((result) => {
        if (result.data.Status) {
          
          setEmployee(result.data.Result);
          console.log(result.data.Result)
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/auth/delete_holi/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const handleEdit = (record) => {
    setEditEmployee(record);
    console.log(isEditModalVisible)
    console.log(isViewModalVisible)
    setIsViewModalVisible(false); // Close the view modal if it's open
    setIsEditModalVisible(true);
    console.log(isEditModalVisible)
    console.log(isViewModalVisible)
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditEmployee(null); // Reset the state when the modal is close
  };

  const handleView = (record) => {
    setEditEmployee(record);
    setIsViewModalVisible(true);
    setIsEditModalVisible(false); // Close the edit modal if it's open
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setEditEmployee(null);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const handleEditSubmit = (editedEmployee) => {
    const formattedDate = new Date(editedEmployee.date).toISOString().split('T')[0];
  
  // Update the editedEmployee object with the formatted date
  editedEmployee.date = formattedDate;

    axios
      .put(`http://localhost:5000/auth/edit_holi/${editedEmployee.id}`, editedEmployee)
      .then((result) => {
        if (result.data.Status) {
          // navigate("/dashboard/employee");
          // setIsEditModalVisible(false);
          setIsEditModalVisible(false); // Close the edit modal
                setEditEmployee(null); // Reset editEmployee state
                alert("Holiday updated successfully!");
                window.location.reload(); // Refresh the page to reflect changes
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
 
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Occasion",
      dataIndex: "occasion",
      key: "occasion",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => formatDate(date),
      
    },
    
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="button-container">
        
          <Button
            to="#"
            type="primary"
            size="large"
            className="btn btn-info btn-sm"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            size="large"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
      // responsive: ["md", "lg", "xl"], // Show on medium, large, and extra-large screens
    },
  ];
  return (
    <div className="employee-container overflow-x-auto font-sans">
      <div className="flex justify-center">
        <h3 className="font-semibold text-3xl">Holidays List</h3>
      </div>
      <div className="flex flex-col items-end ">
        <a href="/Admin1Dashboard/AddHolidays">
      <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Add Holiday
      </button></a>
      </div>
      <div className="mt-3 z-0 container bg-[#e6e3e3]">
        <Table  dataSource={employee} columns={columns} scroll={{ x: 768 }} className="overflow-x-auto container" />
      </div>
      
      {/* Edit Employee Modal */}
      {editEmployee && (
        <Modal
          title="Edit "
          open={isEditModalVisible}  // Corrected prop name
          onCancel={handleEditModalCancel}
          footer={null}
        >
          {/* Render your edit form inside the modal */}
          <EditEmployeeForm
            employee={editEmployee}
            onCancel={handleEditModalCancel}
            onSubmit={handleEditSubmit}
          />
        </Modal>
      )}
      {editEmployee && (
        <Modal
        title="view "
          open={isViewModalVisible}  // Corrected prop name
          onCancel={handleEditModalCancel}
          footer={null}
        >
        <ViewEmployeeModal
        open={isViewModalVisible}
        employee={editEmployee}
          onCancel={handleViewModalCancel}
        />
        </Modal>

      )}
    </div>

  );
};

const ViewEmployeeModal = ({ employee, onCancel }) => {
  return (
    <Modal
    title="View "
    open={true}
    onCancel={onCancel}
    footer={null}
    className="custom-view-modal"
  >
    <div className="employee-profile">
      <img src={`http://localhost:5000/Images/${employee.image}`} alt="Employee" className="profile-image" />
      <Descriptions column={1} className="custom-descriptions">
        <Descriptions.Item label="date">{Holidays.date}</Descriptions.Item>
        <Descriptions.Item label="occasion">{Holidays.occasion}</Descriptions.Item>
        {/* <Descriptions.Item label="Email">{employee.goloka_email}</Descriptions.Item>
        <Descriptions.Item label="Mobile Number">{employee.mobile_no}</Descriptions.Item>
        <Descriptions.Item label="Salary">{employee.salary}</Descriptions.Item>
        <Descriptions.Item label="Job Type">{employee.jobtype}</Descriptions.Item>
        <Descriptions.Item label="Shift Timing">{employee.shift_timing}</Descriptions.Item>
        <Descriptions.Item label="Employee Designation">{employee.employee_designation}</Descriptions.Item> */}
        <Descriptions.Item label="Categories">
            {Array.isArray(employee.categories)
              ? employee.categories.join(', ')
              : employee.categories
            }
          </Descriptions.Item>     {/* <Descriptions.Item label="Categories">
            {categories.map((category) => category.name).join(', ')}
          </Descriptions.Item>   */}   
          </Descriptions> 
    </div>
  </Modal>
  );
};

const EditEmployeeForm = ({ employee, onCancel, onSubmit }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
  };
  useEffect(() => {
    setEditedEmployee(employee); // Update state when the employee prop changes
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedEmployee);
  };

  return (
   
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="inputOccasion" className="block text-sm font-medium text-gray-700">
        Occasion
      </label>
      <input
        type="text"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        placeholder="Enter occasion"
        value={editedEmployee.occasion}
        onChange={(e) =>
          setEditedEmployee({ ...editedEmployee, occasion: e.target.value })
        }
      />
    </div>
    <div>
      <label htmlFor="inputDate" className="block text-sm font-medium text-gray-700">
        Date
      </label>
      <input
        type="date"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        placeholder="Edit Date"
        value={formatDate(editedEmployee.date)}
        onChange={(e) =>
          setEditedEmployee({ ...editedEmployee, date: formatDate(e.target.value) })
        }
      />
    </div>
    <div className="col-span-2 mt-3">
      <button type="submit" className="transition duration-300 ease-in-out bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full transform hover:scale-105">
        Edit Holidays
      </button>
    </div>
  </form>
  
  );
};

export default Holidays;


