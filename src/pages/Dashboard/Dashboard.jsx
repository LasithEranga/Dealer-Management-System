import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { Doughnut } from "react-chartjs-2";

import StockSummery from "./StockSummery";
import { Chart, ArcElement } from "chart.js";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import BarChart from "../../components/BarChart/BarChart";
import DoughnutChartLegends from "./DoughnutChartLegends";
import { useSelector } from "react-redux";
Chart.register(ArcElement);
export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],

      borderWidth: 1,
    },
  ],
};
const Dashboard = () => {
  const userName = useSelector((state) => state.loginDMS.name);
  return (
    <Box mt={2}>
      <Typography fontWeight={"bold"} fontSize="1.8rem" sx={{ my: 2 }}>
        Hi {userName.split(" ")[0]}, Welcome back
      </Typography>
      <Grid container gap={2}>
        <DashboardCard title={"Today total sales"} content="Rs.12,250.00" />
        <DashboardCard
          title={"This month total sales"}
          content="Rs.522,750.00"
        />
        <DashboardCard title={"Sales from new tanks"} content="Rs.36,000.00" />
        <DashboardCard title={"This month returns"} content="Rs.50,300.00" />
      </Grid>

      <Grid container mt={2} gap={2}>
        <Grid item xs={7.5}>
          <ContentCard>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Box className="fw-bold text-secondary">Average Sales</Box>
                <Box className="fw-bold ">Rs. 502,041.00</Box>
              </Box>
              <Box>
                <Select value={30} defaultValue={10} size={"small"}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Last Week</MenuItem>
                  <MenuItem value={30}>Lasth Year</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ height: "25.5rem" }} mb={1.5}>
              <BarChart />
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs>
          <ContentCard
            sx={{
              pb: 4,
            }}
          >
            <Box
              className={`ps-2 fs-5 fw-bold`}
              sx={{ pl: 2, fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Best Performing Dealers
            </Box>
            <Grid container display={"flex"}>
              <Grid item p={3} lg={7}>
                <Doughnut
                  data={data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  height={100}
                />
              </Grid>
              <Grid
                item
                lg
                display={"flex"}
                flexDirection="column"
                alignItems={"start"}
                justifyContent={"center"}
              >
                <DoughnutChartLegends
                  label="Joseph Roberts"
                  indicatorColor="rgba(255, 99, 132, 1)"
                />
                <DoughnutChartLegends
                  label="Ronald Ewing"
                  indicatorColor="rgba(54, 162, 235, 1)"
                />
                <DoughnutChartLegends
                  label="Jhon doe"
                  indicatorColor="rgba(255, 206, 86, 1)"
                />
                <DoughnutChartLegends
                  label="Sunday corner"
                  indicatorColor="rgba(75, 192, 192, 1)"
                />
              </Grid>
            </Grid>

            <Box>
              <StockSummery
                storeName="Joseph Roberts"
                noOfTamks="12 tanks"
                comparisonToLastMonth="10%"
              />
              <StockSummery
                storeName="Ronald Ewing"
                noOfTamks="12 tanks"
                comparisonToLastMonth="5%"
              />
              <StockSummery
                storeName="Jhon doe"
                noOfTamks="12 tanks"
                comparisonToLastMonth="10%"
                increased={false}
              />
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
