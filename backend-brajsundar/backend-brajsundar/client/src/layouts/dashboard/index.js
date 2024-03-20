// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

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
import { useEffect, useState } from "react";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [bookCount, setBookCount] = useState(0);
  const [reelCount, setReelCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  const fetchBookData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books/getBooks");
      const data = response;
      console.log("Book Data: ", data);
      setBookCount(data.data.data.length);
    } catch (error) {
      console.log("Error Fetching Book Data: ", error);
    }
  };

  const fetchReelData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reels/getReels");
      const data = response;
      console.log("Reel Data: ", data);
      setReelCount(data.data.data.length);
    } catch (error) {
      console.log("Error Fetching Reel Data: ", error);
    }
  };

  const fetchVideoData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/youtube/videos");
      const data = response;
      console.log("Video Data: ", data);
      setVideoCount(data.data.length);
    } catch (error) {
      console.log("Error Fetching Video Data: ", error);
    }
  };

  const fetchArticleData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles/getArticles");
      const data = response;
      console.log("Article Data: ", data);
      setArticleCount(data.data.data.length);
    } catch (error) {
      console.log("Error Fetching Article Data: ", error);
    }
  };

  useEffect(() => {
    fetchBookData();
    fetchReelData();
    fetchVideoData();
    fetchArticleData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Books"
                count={bookCount}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Reels"
                count={reelCount}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Videos"
                count={videoCount}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Articles"
                count={articleCount}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
