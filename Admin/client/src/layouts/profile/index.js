// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Card, Spin, Alert, Typography, Input, Button } from "antd";
import { setUserData } from "../../Redux/slices/user-slice";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const { Title, Text } = Typography;
import { BASEURL, IMG } from "API";

import "./index.css";
function Overview() {
  const currentUser = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.username);
  const [newPassword, setNewPassword] = useState("");
  console.log("-----", currentUser.email);
  const handleUpdate = async () => {
    setLoading(true);
    if (newPassword === "") {
      alert("Password can't be empty");
      setLoading(false);
      return;
    }
    if (name === "") {
      alert("name can't be empty");
      setLoading(false);
      return;
    }
    if (newEmail === "") {
      alert(" Email can't be empty");
      setLoading(false);
      return;
    }
    try {
      await axios.put(`${BASEURL}/user/${currentUser.id}`, {
        email: newEmail,
        password: newPassword,
        username: name,
      });
      // Assuming the API call was successful, update the local state
      alert("Data Updated Successfully");
      setNewPassword("");
      setError(null);
      setLoading(false);

      // Dispatch the updated user data to Redux
      dispatch(
        setUserData({ ...currentUser, email: newEmail, password: newPassword, username: name })
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // console.log(userId);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${BASEURL}/getUser/${userId}`);
  //       setUserData("===>", response.data);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <div className="profile-container">
        <Title level={2} className="profile-title">
          Profile Page
        </Title>

        <Card className="profile-card" title="Admin Details">
          <div className="inputDiv">
            <Text className="label" strong style={{ fontSize: "20px" }}>
              Name:
            </Text>
            <Input
              type="text"
              value={name}
              className="FormInputd input-field"
              defaultValue={currentUser?.userName}
              onChange={(e) => setName(e.target.value)}
            />{" "}
          </div>
          <div className="inputDiv">
            <Text className="label" strong style={{ fontSize: "20px" }}>
              Email:
            </Text>
            <Input
              type="email"
              value={newEmail}
              defaultValue={currentUser?.email}
              onChange={(e) => setNewEmail(e.target.value)}
              className="FormInputd input-field"
            />
          </div>
          <div className="inputDiv2">
            <Text className="label" strong style={{ fontSize: "18px" }}>
              Password:
            </Text>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="FormInputd input-field"
            />
          </div>
          <Button
            type="primary"
            onClick={handleUpdate}
            style={{
              margin: "10px 0px",
              fontSize: "15px",
              padding: "4px 15px",
              paddingBottom: "25px",
            }}
          >
            Update
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Overview;
