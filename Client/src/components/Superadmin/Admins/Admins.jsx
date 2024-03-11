import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Space,Modal,Select,Button } from "antd";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddAdminForm from "./AddAdmin";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [admin1s, setAdmin1s] = useState([]);
  const [admin2s, setAdmin2s] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editAdminData, setEditAdminData] = useState(null);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get("http://localhost:5000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        const superAdminData = result.data.Result.filter(
          (admin) => admin.roles === "superadmin"
        );
        const admin1Data = result.data.Result.filter(
          (admin) => admin.roles === "admin1"
        );
        const admin2Data = result.data.Result.filter(
          (admin) => admin.roles === "admin2"
        );

        setAdmins(result.data.Result);
        setSuperAdmins(superAdminData);
        setAdmin1s(admin1Data);
        setAdmin2s(admin2Data);
      } else {
        alert(result.data.Error);
      }
    });
  };
  const handleEdit = (admin) => {
    setEditAdminData(admin);
    setIsEditModalVisible(true);
  };
  const adminCount = () => {
    axios.get("http://localhost:5000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:5000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:5000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };

  const handleDelete = (id) => {
    const result = window.confirm("Are you sure you want to delete the following Admin?")
    if(result){
    axios
      .delete("http://localhost:5000/auth/delete_admin/" + id)
      .then((result) => {
        if (result.data.Status) {
          AdminRecords();
        } else {
          alert(result.data.Error);
        }
      });
    }
    else{
      return false;
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      className:"text-xl font-bold",
      key: "email",
      align: "center",
    },
    {
        title: "Action",
        key: "action",
        className:"text-xl font-bold",
        align: "center",
    //   className:"text-xl font-bold",
        
        render: (text, record) => (
          <Space size="middle">
            <button
            onClick={() => handleEdit(record)} // Pass the admin record to handleEdit
            className="btn btn-primary btn-sm rounded-md px-3 py-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:bg-blue-600"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
            <button
              onClick={() => handleDelete(record.id)}
              className="btn btn-danger btn-sm rounded-md px-3 py-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:bg-red-600"
            >
              <FaTrash className="mr-1" /> Delete
            </button>
          </Space>
        ),
      },
      
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    
  };
  const handleUpdateAdmin = () => {
    // Implement the logic to update admin roles
    axios
      .put(`http://localhost:5000/auth/edit_admins/${editAdminData.id}`, {
        roles: editAdminData.roles,
      })
      .then((result) => {
        if (result.data.Status) {
          AdminRecords();
          setIsEditModalVisible(false); // Close modal after successful update
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error updating admin:", error);
        alert("Error updating admin. Please try again later.");
      });
  };
  return (
    <div className="container mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-center pb-2 font-semibold">Admin</h4>
          <hr />
          <div className="flex justify-between mt-4">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-center pb-2 font-semibold">Employee</h4>
          <hr />
          <div className="flex justify-between mt-4">
            <h5>Total: </h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="text-center pb-2 font-semibold">Salary</h4>
          <hr />
          <div className="flex justify-between mt-4">
            <h5>Total: </h5>
            <h5>Rs.{salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={showModal}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <FaPlus className="mr-2" /> Add Admin
        </button>
      </div>
      <Modal
        title="Add Admin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddAdminForm onClose={handleCancel} />
      </Modal>
      <Modal
        title="Edit Admin"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={[
          <div style={{ display: "flex", justifyContent: "space-between" }}>
    <Button className="mx-2 bg-red-500 text-white" key="cancel" onClick={handleCancel} type="default">
      Cancel
    </Button>
    <Button key="submit" className="bg-blue-500" onClick={handleUpdateAdmin} type="primary">
      Update
    </Button>
  </div>
        ]}
      >
        {editAdminData && (
         <div>
         <h2>Email: {editAdminData.email}</h2>
         {/* Dropdown for selecting admin roles */}
         <Select
           defaultValue={editAdminData.roles}
           style={{ width: 200 }}
           onChange={(value) =>
             setEditAdminData({ ...editAdminData, roles: value })
           }
         >
           <Option value="superadmin">Super Admin</Option>
           <Option value="admin1">Admin 1</Option>
           <Option value="admin2">Admin 2</Option>
         </Select>
       </div>
        )}
      </Modal>
      <div className="mt-4 overflow-x-auto">
        <h3 className="font-semibold mb-2 ">List of Super Admins</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Table className="overflow-x-auto" dataSource={superAdmins} columns={columns} />
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white overflow-x-auto rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-center mb-2">List of Admin1</h3>
          <Table className="overflow-x-auto" dataSource={admin1s} columns={columns} />
        </div>
        <div className="bg-white overflow-x-auto rounded-lg shadow-md p-6">
          <h3 className="text-2xl text-center font-semibold mb-2">List of Admin2</h3>
          <Table className="overflow-x-auto" dataSource={admin2s} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
