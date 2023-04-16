import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import StockSummery from "./StockSummery";
import { Chart, ArcElement } from "chart.js";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import BarChart from "../../components/BarChart/BarChart";
import DoughnutChartLegends from "./DoughnutChartLegends";
import { useSelector } from "react-redux";
import {
  bestPerformingDealers,
  dashboardChart,
  dashboardSalesInfo,
} from "../../app/api/dasboardInfoServices";
import { convertToRupees } from "../../utils/convertToRupees";
Chart.register(ArcElement);

export const chartColors = ["#FF6384", "#36A2EB", "#FFCE56"];

const Dashboard = () => {
  const userName = useSelector((state) => state.loginDMS.name);
  const userId = useSelector((state) => state.loginDMS.userId);
  const [salesInfo, setSalesInfo] = useState({});
  const [chartData, setChartData] = useState({});
  const [bestPerformingDealersData, setBestPerformingDealersData] = useState(
    []
  );

  useEffect(() => {
    dashboardSalesInfo(
      {
        userId,
      },
      (response) => {
        if (response.status === 0) {
          setSalesInfo(response.data);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
    dashboardChart(
      {
        userId,
      },
      (response) => {
        if (response.status === 0) {
          setChartData(response.data);
        }
      },
      () => {},
      () => {}
    );
    bestPerformingDealers(
      {
        userId,
      },
      (response) => {
        if (response.status === 0) {
          setBestPerformingDealersData(response.data);
        }
      },
      () => {},
      () => {}
    );
  }, []);

  return (
    <Box mt={2}>
      <Typography fontWeight={"bold"} fontSize="1.8rem" sx={{ my: 2 }}>
        Hi {userName.split(" ")[0]}, Welcome back
      </Typography>
      <Grid container gap={2}>
        <DashboardCard
          title={"Today total sales"}
          content={convertToRupees(salesInfo?.salesToday)}
        />
        <DashboardCard
          title={"This month total sales"}
          content={convertToRupees(salesInfo?.salesThisMonth)}
        />
        <DashboardCard
          title={"Sales from new tanks"}
          content={convertToRupees(salesInfo?.salesThisMonthNewTanks)}
        />
        <DashboardCard
          title={"This month returns"}
          content={convertToRupees(salesInfo?.returnsThisMonth)}
        />
      </Grid>

      <Grid container mt={2} spacing={2}>
        <Grid item xs={7.5}>
          <ContentCard>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Box className="fw-bold text-secondary">Average Sales</Box>
                <Box className="fw-bold ">
                  {convertToRupees(chartData?.avgSales)}
                </Box>
              </Box>
              <Box>
                <Select value={30} defaultValue={10} size={"small"}>
                  <MenuItem value={10}>Today</MenuItem>
                  <MenuItem value={20}>Last Week</MenuItem>
                  <MenuItem value={20}>Last Month</MenuItem>
                  <MenuItem value={30}>This Year</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ height: "25.5rem" }} mb={1.5}>
              <BarChart
                labels={chartData?.labels}
                datasetI={chartData?.sales}
                datasetII={chartData?.returns}
              />
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs={4.5}>
          <ContentCard
            sx={{
              pb: 2,
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
                  data={{
                    labels: [
                      bestPerformingDealersData.map(
                        (oneEl) => oneEl.dealer.name
                      ),
                    ],
                    datasets: [
                      {
                        label: "Sales",
                        data: bestPerformingDealersData.map(
                          (oneEl) => oneEl.sales
                        ),
                        backgroundColor: chartColors,
                        borderWidth: 1,
                      },
                    ],
                  }}
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
                {bestPerformingDealersData.map((oneEl, index) => (
                  <DoughnutChartLegends
                    label={oneEl.dealer.name}
                    indicatorColor={chartColors[index]}
                    key={index}
                  />
                ))}
              </Grid>
            </Grid>

            <Box>
              {bestPerformingDealersData.map((oneEl, index) => (
                <StockSummery
                  storeName={oneEl.dealer.name}
                  noOfTamks={`${oneEl.noOfTanks} tanks`}
                  comparisonToLastMonth={`${oneEl.percentage}%`}
                  key={index}
                  increased={oneEl.status === "increased" ? true : false}
                />
              ))}
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
