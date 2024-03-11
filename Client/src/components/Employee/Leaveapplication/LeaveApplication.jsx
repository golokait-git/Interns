import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveApplication = () => {
  const [employee, setEmployee] = useState({
    emp_id: "",
    employee_name: "",
    goloka_email: "",
    number_of_days: "",
    type_of_leave: "",
    reason: "",
    start_date: "",
    end_date: null,
    status: "Pending",
  });
  const [holidays, setHolidays] = useState([]);
  const [holidays2, setHolidays2]=useState([]);

  // const [halfday, setHalfday] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLeaveTypeChange = (e) => {
    const selectedLeaveType = e.target.value;
    const isHalfLeave = selectedLeaveType === "HalfLeave";
    setEmployee({
      ...employee,
      type_of_leave: selectedLeaveType,
      number_of_days: isHalfLeave ? 1 : "", // Set number of days to 1 if Half Leave is selected
    });
  };
  console.log(holidays);
  useEffect(() => {
    axios 
      .get("http://localhost:5000/employee/holidays")
      .then((result) => {
        if (result.data.Status) {
          const holidays2 = result.data.Result.map(
            (holidays)=>new Date(holidays.date)
          );
          const holidayDate2 = holidays2.map(formatDate);
          setHolidays2(holidayDate2)
          console.log("Date"+holidays2);
          const holidayDates = result.data.Result.map(
            (holiday) => new Date(holiday.date)
            );
            const holidayDate = holidayDates.map(formatDate);
            
            
            setHolidays(holidayDate);
            
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //Automated data filling
    if (!employee.goloka_email) {
      axios
        .get("http://localhost:5000/employee/" + id + "/leavedetails")
        .then((response) => {
          setEmployee((prevEmployee) => ({
            ...prevEmployee,
            emp_id: response.data.Result[0].id,
            employee_name: response.data.Result[0].name,
            goloka_email: response.data.Result[0].goloka_email,
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, employee]);
  //Automated Data filling

  //PaidLeave
  const handlePaidLeave = async () => {
    const formData = new FormData();
    formData.append("emp_id", employee?.emp_id);
    formData.append("employee_name", employee.employee_name);
    formData.append("goloka_email", employee.goloka_email);
    formData.append("number_of_days", employee.number_of_days);
    formData.append("type_of_leave", employee.type_of_leave);
    formData.append("reason", employee.reason);
    formData.append("start_date", employee.start_date);
    formData.append("end_date", employee.end_date);
    formData.append("status", employee.type_of_leave);
    console.log(employee);
    await axios
      .post("http://localhost:5000/employee/leaveapplication", employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/employee_detail/" + result.data.id);
          alert("Leave applied successfully");
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  //PaidLeave
  //SickLeave
  const handleSickLeave = () => {
    console.log(employee.type_of_leave);
    const formData = new FormData();
    formData.append("emp_id", employee.emp_id);
    formData.append("employee_name", employee.employee_name);
    formData.append("goloka_email", employee.goloka_email);
    formData.append("number_of_days", employee.number_of_days);
    formData.append("type_of_leave", employee.type_of_leave);
    formData.append("reason", employee.reason);
    formData.append("start_date", employee.start_date);
    formData.append("end_date", employee.end_date);
    formData.append("status", employee.type_of_leave);
    axios
      .post("http://localhost:5000/employee/sickleaveapplication", employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/employee_detail/" + result.data.id);
          alert("Leave applied successfully");
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  //SickLeave
  //HalfDayLeave
  const handleHalfDay = () => {
    console.log(employee.type_of_leave);

    const formData = new FormData();
    formData.append("emp_id", employee.emp_id);
    formData.append("employee_name", employee.employee_name);
    formData.append("goloka_email", employee.goloka_email);
    formData.append("number_of_days", employee.number_of_days);
    formData.append("type_of_leave", employee.type_of_leave);
    formData.append("reason", employee.reason);
    formData.append("start_date", employee.start_date);

    // Set end_date to null if type_of_leave is "HalfLeave"
    const dataToSend = {
      ...employee,
      end_date:
        employee.type_of_leave === "HalfLeave" ? null : employee.end_date,
    };

    formData.append("end_date", dataToSend.end_date);

    formData.append("status", employee.type_of_leave);
    console.log(employee);
    axios
      .post("http://localhost:5000/employee/halfleaveapplication", employee)
      .then((result) => {
        console.log(result);
        if (result.data.Status) {
          navigate("/employee_detail/" + result.data.id);
          alert("Leave applied successfully");
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };

  //HalfDay Leave
  
  //Get Day in words
  const getDayInWords = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };
  //Get Day in words

  const convertToMMDDYYYY = (dateString) => {
    if (typeof dateString !== 'string' || !dateString.includes('/')) {
        return "Invalid date string";
    }
    const [day, month, year] = dateString.split('/');
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return "Invalid date format";
    }
    return `${month}/${day}/${year}`;
};

  const handlevalidations = () => {
    const startDate2 =new Date(employee.start_date)
    const startDate = formatDate(employee.start_date);
    const endDate = formatDate(employee.end_date);
    console.log(startDate);
    const startDay= getDayInWords(startDate);
    const endDay = getDayInWords(endDate);
    console.log(startDay);
    //Genral greater validation
    if (employee.number_of_days > 1) {
      if (endDate < startDate) {
        alert("End date must be greater than start date");
        return false;
      }
    }
    //General greater validation
    //General Weekend validation
    if(startDay ==="Sunday"||startDay ==="Saturday")
    {
      alert("Start Date is a weekend")
      return false;
    }
    if(endDay ==="Sunday"||endDay ==="Saturday")
    {
      alert("End Date is a weekend")
      return false;
    }
    //General Weekend validation
    //General holiday validation
    if (holidays.includes(startDate)) {
      alert("Start date is Public Holiday cannot apply leave on a holiday");
      return false;
    }
    if (holidays.includes(endDate)) {
      alert("End date is Public Holiday cannot apply leave on a holiday");
      return false;
    }
    //Genral holiday validation
    // If holiday is 1 day
    const isOneDayDifference = holidays2.some((holiday) => {
      const holidayDate = new Date(holiday);
      const startDateDate = new Date(startDate);
      const holidayDay = holidayDate.getDate();
      const startDay = startDateDate.getDate();
      return Math.abs(holidayDay - startDay) === 1;
    });
    if (
      (employee.number_of_days === "1" && employee.type_of_leave !== "HalfLeave" && (startDay === "Friday" || startDay === "Monday")) ||
      isOneDayDifference
    ){
      console.log("here");
      const result = window.confirm(
        "Sandwich leave is applied, 2 days would be deducted"
      );

      if (result) {
        employee.number_of_days = 2;
        return true;
      }
      return false;
    }
  //If holiday is 1 day
  // If holiday is 2 days
    if (employee.number_of_days === "2" && startDay === "Friday" && endDay === "Monday") {
      const result = window.confirm(
        "Sandwich leave is applied, 4 days would be deducted"
      );
      if (result) {
        employee.number_of_days = 4;
        return true;
      } else {
        return false;
      }
    }
    return true;
  };


  function formatDate(dateString) {
    console.log(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    console.log(formattedDate);
    return formattedDate;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handlevalidations() === true) {
      // alert("Check your dates");

      const leaveType = employee.type_of_leave.toLowerCase();
      if (leaveType === "sickleave") {
        handleSickLeave();
      } else if (leaveType === "halfleave") {
        handleHalfDay();
      } else if (leaveType === "paidleave") {
        handlePaidLeave();
      }
    }
  };

  return (
<div className="flex justify-center items-center mt-8 overflow-x-auto">
  <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl overflow-x-auto">
    <h4 className="mb-6 text-center text-3xl font-bold">
      Employee Leave Form
    </h4>
    <form className="flex flex-col sm:grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="empID" className="block text-sm font-bold mb-2">
          Employee ID
        </label>
        <input
          type="text"
          id="empID"
          className="form-input"
          readOnly
          value={employee.emp_id}
          onChange={(e) =>
            setEmployee({ ...employee, emp_id: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          readOnly
          value={employee.employee_name}
          onChange={(e) =>
            setEmployee({ ...employee, employee_name: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email address<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          aria-describedby="emailHelp"
          required
          readOnly
          value={employee.goloka_email}
          onChange={(e) =>
            setEmployee({ ...employee, goloka_email: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="leaveType" className="block text-sm font-bold mb-2">
          Type Of Leave<span className="text-red-500">*</span>
        </label>
        <select
          id="leaveType"
          className="form-select"
          defaultValue=""
          required
          onChange={handleLeaveTypeChange}
        >
          <option value="" disabled>
            --Select Type--
          </option>
          <option value="SickLeave">Sick Leave</option>
          <option value="PaidLeave">Paid Leave</option>
          <option value="HalfLeave">Half Leave</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="reason" className="block text-sm font-bold mb-2">
          Reason<span className="text-red-500">*</span>
        </label>
        <textarea
          id="reason"
          className="form-textarea"
          placeholder="Enter your reason (up to 300 words)"
          rows="3"
          maxLength="300"
          required
          onChange={(e) =>
            setEmployee({ ...employee, reason: e.target.value })
          }
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfDays" className="block text-sm font-bold mb-2">
          Number Of Days<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="numberOfDays"
          className="form-input"
          placeholder="Enter Number Of Days"
          required
          disabled={employee.type_of_leave === "HalfLeave"}
          value={
            employee.type_of_leave === "HalfLeave" ? "1" : employee.number_of_days
          }
          onChange={(e) =>
            setEmployee({ ...employee, number_of_days: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-bold mb-2">
          Start Date<span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="startDate"
          className="form-input"
          required
          onChange={(e) =>
            setEmployee({ ...employee, start_date: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-bold mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="form-input"
          onChange={(e) =>
            setEmployee({ ...employee, end_date: e.target.value })
          }
          disabled={employee.number_of_days === "1"}
        />
      </div>
      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Apply
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default LeaveApplication;
