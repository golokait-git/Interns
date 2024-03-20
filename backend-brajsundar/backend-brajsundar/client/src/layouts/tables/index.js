import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// ... (other imports)

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function Tables() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("http://localhost:5000/api/books/getBooks")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setBooksData(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Define columns only if data is available
  const columns = booksData.length > 0 ? Object.keys(booksData[0]) : [];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Books Table
                </MDTypography>
              </MDBox>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booksData.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column}>
                            {row[column] !== undefined ? row[column] : ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
