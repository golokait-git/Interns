// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BASEURL, IMG } from "API";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, removeUserData } from "../../Redux/slices/user-slice";
import { Button } from "antd";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [bookCount, setBookCount] = useState(0);
  const [reelCount, setReelCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [cochingCount, setCochingCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [workshopCount, setWorkshopCount] = useState(0);
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReelData();
    fetchBookData();
    fetchVideoData();
    fetchArticleData();
    fetchCoachingData();
    fetchCourseData();
    fetchWorkshopData();
    fetchReviewsData();
    console.log(bookCount);
    console.log(reelCount);
    console.log(videoCount);
    console.log(articleCount);
    console.log(bookCount);
  }, []);
  const fetchBookData = () => {
    fetch(`${BASEURL}/book`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookCount(data.length);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchReelData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/reels`);
      const data = response.data;
      console.log("Reel Data: ", data);
      setReelCount(data.length);
    } catch (error) {
      console.log("Error Fetching Reel Data: ", error);
    }
  };

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/video`);
      const data = response.data;
      console.log("Video Data: ", data);
      setVideoCount(data.length);
    } catch (error) {
      console.log("Error Fetching Video Data: ", error);
    }
  };

  const fetchArticleData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/article`);
      const data = response.data;
      console.log("Article Data: ", data);
      setArticleCount(data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };
  const fetchWorkshopData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/workshop`);
      const data = response.data;
      console.log("Article Data: ", data);
      setWorkshopCount(data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };
  const fetchCoachingData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/coaching`);
      const data = response.data;
      console.log("Article Data: ", data);
      setCochingCount(data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/course`);
      const data = response.data;
      console.log("Article Data: ", data);
      setCoursesCount(data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };
  const fetchReviewsData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/review`);
      const data = response.data;
      console.log("Article Data: ", data);
      setReviewsCount(data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };
  const logoutUser = (e) => {
    console.log("Logout successful");
    reduxDispatch(removeUserData());
    navigate("/auth/signin");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        {/* <Button onClick={logoutUser}>Logout</Button> */}
        <MDBox py={10}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Books"
                  count={bookCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Reels"
                  count={reelCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Videos"
                  count={videoCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Articles"
                  count={articleCount}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Courses"
                  count={coursesCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Coaching"
                  count={cochingCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Workshops"
                  count={workshopCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Reviews"
                  count={reviewsCount}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
