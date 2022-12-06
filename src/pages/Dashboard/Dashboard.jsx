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
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </Grid>

      <Grid container mt={2} gap={2}>
        <Grid item xs={7.5}>
          <ContentCard>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Box className="fw-bold text-secondary">Average Sales</Box>
                <Box className="fw-bold ">Rs. 12,3434.00</Box>
              </Box>
              <Box>
                <Select value={10} defaultValue={10} size={"small"}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Last Week</MenuItem>
                  <MenuItem value={30}>Lasth Month</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ height: "25.5rem" }} mb={1.5}>
              <BarChart />
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs>
          <ContentCard>
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
                alignItems={"center"}
                justifyContent={"center"}
              >
                <DoughnutChartLegends
                  label="Lasith's Store"
                  indicatorColor="rgba(255, 99, 132, 1)"
                />
                <DoughnutChartLegends
                  label="Lahiru's Store"
                  indicatorColor="rgba(54, 162, 235, 1)"
                />
                <DoughnutChartLegends
                  label="Wasana Store"
                  indicatorColor="rgba(255, 206, 86, 1)"
                />
                <DoughnutChartLegends
                  label="Sunday corner"
                  indicatorColor="rgba(75, 192, 192, 1)"
                />
              </Grid>
            </Grid>

            <Box>
              <StockSummery />
              <StockSummery />
              <StockSummery />
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
