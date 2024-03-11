import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import "./AddEmployee.css";

const { Option } = Select;
axios.defaults.withCredentials = true;

const AddHolidays = () => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [selectedShiftTiming, setSelectedShiftTiming] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
 
  const onFinish = async (values) => {
    console.log(values);
        try {
          const data = {
            occasion: values.occasion,
            date: values.date,
           
          };
          console.log(data);
          const result = await axios.post(
            "http://localhost:5000/auth/add_holi",
            data,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
    
          console.log("Server Response:", result);
    
          if (result.data.Status) {
            // Reset form or perform other actions on success
            navigate("/Admin1Dashboard/Holidays")
          } else {
            alert("Done!!");
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while adding .");
        }
      };
  useEffect(() => {
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
  }, []);

  const handleSubmit = (values) => {
    const formData = new FormData();
    console.log(values);
    formData.append("id", values.id);
    formData.append("occasion", values.occasion);
    formData.append("action", values.action);
   

    console.log(formData);
    axios
      .post("http://localhost:5000/auth/add_holi", formData) // Adjusted this line
      .then((result) => {
        console.log(result);
        if (result.data.Status) {
          navigate("");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };



  return (
    <div class="flex justify-center items-center mt-3 overflow-x-auto">
  <div class="bg-white rounded-lg border w-full md:w-3/4 lg:w-1/2 xl:w-2/3 p-6">
    <h3 class="text-center text-lg font-semibold mb-4">Add Holidays</h3>
    <form class="space-y-4" 
          form={form} 
          onFinish={onFinish} 
          labelCol={{ span: 12 }} 
          wrapperCol={{ span: 12 }}
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="occasion" class="block text-sm font-medium text-gray-700">Occasion</label>
            <input id="occasion" 
                   name="occasion" 
                   type="text" 
                   class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                   placeholder="Enter occasion"
                   required
            />
          </div>
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input id="date" 
                   name="date" 
                   type="date" 
                   class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                   placeholder="Enter date"
                   required
            />
          </div>
        </div>
      </div>
      <div>
        <button type="submit" 
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        >
          Add Holiday
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddHolidays;
