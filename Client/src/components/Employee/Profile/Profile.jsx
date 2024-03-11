import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result[0]);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const InfoItem = ({ label, value }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}:</label>
      <p className="text-gray-700">{value}</p>
    </div>
  );

  const TableRow = ({ label, value }) => (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4 text-gray-700 font-bold">{label}</td>
      <td className="py-2 px-4">{value}</td>
    </tr>
  );

  return !loading ? (
    <div className="flex justify-center items-center mt-8 overflow-x-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full min-w-2xl ">
        <h3 className="text-3xl font-bold text-center mb-4">PROFILE</h3>
        <div className="overflow-x-auto">
          <img
            src={`http://localhost:5000/Images/${employee.image}`}
            alt="Employee"
            className=" w-[250px] h-[250px] left-0 mx-auto rounded-full mb-6 border-2 border-dashed border-cyan-700"
          />
          <table className="table-auto w-full overflow-x-auto">
            <tbody>
              <TableRow label="Employee ID" value={employee.id} />
              <TableRow label="Name" value={employee.name} />
              <TableRow label="Mobile No." value={employee.mobile_no} />
              <TableRow
                label="Personal Email"
                value={employee.personal_email}
              />
              <TableRow label="GolokaIt Email" value={employee.goloka_email} />
              <TableRow label="Salary" value={employee.salary} />
              <TableRow label="Address" value={employee.address} />
              <TableRow label="Job Type" value={employee.jobtype} />
              <TableRow label="Shift Timing" value={employee.shift_timing} />
              <TableRow
                label="Employee Designation"
                value={employee.employee_designation}
              />
              <TableRow label="Paid Leaves" value={employee.paid_leave} />
              <TableRow label="Sick Leaves" value={employee.sick_leave} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default Profile;
