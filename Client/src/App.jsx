import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
// superAdmin
import Supersidenav from "./components/Superadmin/Sidenav/Supersidenav";
import Admins from "./components/Superadmin/Admins/Admins";
import Employeetable from "./components/Superadmin/Employeetable/Employeetable";
import Category from "./components/Superadmin/Category/Category";
import AddEmployee from "./components/Superadmin/Employeetable/AddEmployee";
// login
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import NewPassword from "./components/ForgotPassword/NewPassword";
import VerifyOTP from "./components/ForgotPassword/VerifyOTP";
// admin1
import Admin1Dashboard from "./components/Admin1/Dashboard/Admin1Dashboard";
import Admin1Approved from "./components/Admin1/Approved/Admin1Approved";
import Admin1DisApproved from "./components/Admin1/Disapproved/Admin1Disapproved";
import Holidays from "./components/Admin1/Holidays/Holidays";
import AddHolidays from "./components/Admin1/Holidays/Addholidays";
import Admin1sidenav from "./components/Admin1/Sidenav/Supersidenav";
// admin2
import Admin2Dashboard from "./components/Admin2/Dashboard/Admin2Dashboard";
import Admin2Approved from "./components/Admin2/Approved/Admin2Approved";
import Admin2DisApproved from "./components/Admin2/Disapproved/Admin2Disapproved";
import Admin2sidenav from "./components/Admin2/Sidenav/Supersidenav";
//Employee
import { AuthProvider } from "./AuthContext/AuthContext";
import EmployeeProfile from "./components/Employee/Profile/Profile";
import LeaveApplication from "./components/Employee/Leaveapplication/LeaveApplication";
// import EmployeeDetail from "./components/Employee/EmployeeDetail/EmployeeDetail";
import EmployeeStatus from "./components/Employee/EmployeeStatus/EmployeeStatus";
import EmployeeSidenav from "./components/Employee/Sidenav/Supersidenav";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* login */}
            <Route path="/start" element={<Login />}></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/VerifyOTP" element={<VerifyOTP />}></Route>
            <Route path="/NewPassword" element={<NewPassword />}></Route>
            <Route path="/" element={<Login />}></Route>
            {/* superadmin */}{" "}
            <Route
              path="/superAdminDashboard"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <Supersidenav />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <Admins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="employeeTable"
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <Employeetable />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addEmployee"
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <AddEmployee />
                  </ProtectedRoute>
                }
              />
              <Route
                path="category"
                element={
                  <ProtectedRoute allowedRoles={["superadmin"]}>
                    <Category />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* admin1 */}
            <Route
              path="/Admin1Dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin1"]}>
                  <Admin1sidenav />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={["admin1"]}>
                    <Admin1Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Admin1Approved"
                element={
                  <ProtectedRoute allowedRoles={["admin1"]}>
                    <Admin1Approved />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Admin1Disapproved"
                element={
                  <ProtectedRoute allowedRoles={["admin1"]}>
                    <Admin1DisApproved />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Holidays"
                element={
                  <ProtectedRoute allowedRoles={["admin1"]}>
                    <Holidays />
                  </ProtectedRoute>
                }
              />
              <Route
                path="AddHolidays"
                element={
                  <ProtectedRoute allowedRoles={["admin1"]}>
                    <AddHolidays />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* admin2 */}
            <Route
              path="/Admin2Dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin2"]}>
                  <Admin2sidenav />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute allowedRoles={["admin2"]}>
                    <Admin2Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Admin2Approved"
                element={
                  <ProtectedRoute allowedRoles={["admin2"]}>
                    <Admin2Approved />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Admin2Disapproved"
                element={
                  <ProtectedRoute allowedRoles={["admin2"]}>
                    <Admin2DisApproved />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* employee */}
            <Route
              path="/employee_detail"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <EmployeeSidenav />
                </ProtectedRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <ProtectedRoute allowedRoles={["Employee"]}>
                    <EmployeeProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id/leaveapplication"
                element={
                  <ProtectedRoute allowedRoles={["Employee"]}>
                    <LeaveApplication />
                  </ProtectedRoute>
                }
              />
              {/* <Route path=":id/employee_detail" element={<EmployeeDetail />}/> */}
              <Route
                path=":id/employee_status"
                element={
                  <ProtectedRoute allowedRoles={["Employee"]}>
                    <EmployeeStatus />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
export default App;
