import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Space, Modal, Descriptions ,Select} from "antd";
import axios from "axios";
// import "antd/dist/antd.css";
import "./EmployeeTable.css"; // Create a separate CSS file for styling
const { Option } = Select;

const EmployeeTable = () => {
  const [employee, setEmployee] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      fetch()
  }, []);
  function fetch() {
    axios
      .get("http://localhost:5000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  
  const handleEdit = (record) => {
    setEditEmployee(record);
    setIsViewModalVisible(false); // Close the view modal if it's open
    setIsEditModalVisible(true);
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

  const handleEditSubmit = (editedEmployee) => {
    axios
      .put(
        `http://localhost:5000/auth/edit_employee/${editedEmployee.id}`,
        editedEmployee
      )
      .then((result) => {
        if (result.data.Status) {
          // navigate("/dashboard/employee");
          setIsEditModalVisible(false);
          fetch()
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <div className="flex items-center">
          <div className="w-14 h-14 overflow-hidden rounded-full mr-2">
            <img
              src={`http://localhost:5000/Images/` + image}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      ),
    },
    {
      title: "Email ID",
      dataIndex: "goloka_email",
      key: "goloka_email",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div className="button-container">
          <Button
            type="primary"
            size="large"
            className="btn btn-info btn-sm"
            onClick={() => handleView(record)}
          >
            View
          </Button>
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
    <div className="employee-container font-sans">
      <div className="flex justify-center text-4xl font-bold">
        <h3>Employee List</h3>
      </div>
      <div style={{ marginTop: "2vh", marginBottom: "2vh" }}>
        <Link
          to="/superAdminDashboard/addEmployee"
          type="button"
          style={{ float: "right" }}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Employee
        </Link>
      </div>
      <div style={{ backgroundColor: "#e6e3e3" }} className="mt-3 text-center">
        <Table dataSource={employee} columns={columns} scroll={{ x: 768 }} />
      </div>

      {/* Edit Employee Modal */}
      {editEmployee && (
        <Modal
          title="Edit Employee"
          visible={isEditModalVisible} // Corrected prop name
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
          title="view Employee"
          visible={isViewModalVisible} // Corrected prop name
          onCancel={handleEditModalCancel}
          footer={null}
        >
          <ViewEmployeeModal
            visible={isViewModalVisible}
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
      title="View Employee"
      visible={true}
      onCancel={onCancel}
      footer={null}
      className="custom-view-modal"
    >
      <div className="employee-profile">
        <img
          src={`http://localhost:5000/Images/${employee.image}`}
          alt="Employee"
          className="profile-image"
        />
        <Descriptions column={1} className="custom-descriptions">
          <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {employee.address}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {employee.goloka_email}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile Number">
            {employee.mobile_no}
          </Descriptions.Item>
          <Descriptions.Item label="Salary">
            {employee.salary}
          </Descriptions.Item>
          <Descriptions.Item label="Job Type">
            {employee.jobtype}
          </Descriptions.Item>
          <Descriptions.Item label="Shift Timing">
            {employee.shift_timing}
          </Descriptions.Item>
          <Descriptions.Item label="Employee Designation">
            {employee.employee_designation}
          </Descriptions.Item>
          <Descriptions.Item label="Categories">
            {Array.isArray(employee.categories)
              ? employee.categories.join(", ")
              : employee.categories}
          </Descriptions.Item>{" "}
          {/* <Descriptions.Item label="Categories">
            {categories.map((category) => category.name).join(', ')}
          </Descriptions.Item>   */}
        </Descriptions>
      </div>
    </Modal>
  );
};

const EditEmployeeForm = ({ employee, onCancel, onSubmit }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setEditedEmployee(employee);
    fetchCat() // Update state when the employee prop changes
  }, [employee]);
  function fetchCat() {
    axios
      .get("http://localhost:5000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedEmployee);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl mb-4 text-gray-800 font-bold">Edit Employee</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="inputName"
            className="text-sm font-bold text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputName"
            placeholder="Enter Name"
            value={editedEmployee.name}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, name: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputMobile"
            className="text-sm font-bold text-gray-600"
          >
            Mobile No.
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputMobile"
            placeholder="Edit Mobile no."
            value={editedEmployee.mobile_no}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                mobile_no: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputAddress"
            className="text-sm font-bold text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputAddress"
            placeholder="1234 Main St"
            value={editedEmployee.address}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, address: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputEmail"
            className="text-sm font-bold text-gray-600"
          >
            Personal Email
          </label>
          <input
            type="email"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputEmail"
            placeholder="Enter Personal Email"
            value={editedEmployee.personal_email}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                personal_email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputGolokaEmail"
            className="text-sm font-bold text-gray-600"
          >
            Goloka Mail ID
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputGolokaEmail"
            placeholder="Enter Goloka Mail ID"
            value={editedEmployee.goloka_email}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                goloka_email: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputSalary"
            className="text-sm font-bold text-gray-600"
          >
            Salary
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputSalary"
            placeholder="Enter Salary"
            value={editedEmployee.salary}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, salary: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputJobType"
            className="text-sm font-bold text-gray-600"
          >
            Job Type
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputJobType"
            placeholder="Enter Job Type"
            value={editedEmployee.jobtype}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, jobtype: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputShiftTiming"
            className="text-sm font-bold text-gray-600"
          >
            Shift Timing
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputShiftTiming"
            placeholder="Enter Shift Timing"
            value={editedEmployee.shift_timing}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                shift_timing: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="inputEmployeeDesignation"
            className="text-sm font-bold text-gray-600"
          >
            Employee Designation
          </label>
          <input
            type="text"
            className="form-input rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full"
            id="inputEmployeeDesignation"
            placeholder="Enter Employee Designation"
            value={editedEmployee.employee_designation}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                employee_designation: e.target.value,
              })
            }
          />
        </div>
        <Select
          mode="multiple"
          placeholder="Select Categories"
          onChange={(values) => setSelectedCategories(values)}
        >
          {category.map((c) => (
            <Option key={c.id} value={c.name}>
              {c.name}
            </Option>
          ))}
        </Select>
        {/* Add more input fields in a similar manner */}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Edit Employee
        </button>
      </div>
    </form>
  );
};
export default EmployeeTable;
