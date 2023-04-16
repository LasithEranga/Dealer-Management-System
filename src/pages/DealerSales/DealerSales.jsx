import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AnalyticsCard from "../../components/AnalyticsCard/AnalyticsCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import SalesCard from "../../components/SalesCard/SalesCard";
import {
  dealerSalesByGasTankName,
  dealerSalesChartData,
  dealerSalesSummery,
} from "../../app/api/salesReceiptServices";
import { useSelector } from "react-redux";
import { convertToRupees } from "../../utils/convertToRupees";

const DealerSales = () => {
  console.log("DealerSales");
  const userId = useSelector((state) => state.loginDMS.userId);

  const [data, setData] = useState([]);
  const [analyticsOverview, setAnalyticsOverview] = useState([]);
  const [dealerSalesSummary, setDealerSalesSummary] = useState([]);

  useEffect(() => {
    dealerSalesChartData(
      {
        userId: userId,
        dealer: "",
      },
      (res) => {
        setData(res.data);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
    dealerSalesByGasTankName(
      {
        userId: userId,
        dealer: "",
      },
      (res) => {
        setAnalyticsOverview(res.data);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
    dealerSalesSummery(
      {
        userId: userId,
      },
      (res) => {
        setDealerSalesSummary(res.data);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: data.map((oneEl) => oneEl.month),
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return convertToRupees(val);
        },
      },
    },
  };
  const series = [
    {
      name: "Sales",
      data: data.map((oneEl) => oneEl.sales),
    },
  ];

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Dealer Sales
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} md={9} pr={2}>
          <ContentCard>
            <Chart
              options={options}
              series={series}
              type="area"
              height="350"
              width="100%"
            />
          </ContentCard>
          <Box mb={1.5} mt={1}>
            <ContentCard>
              <Typography fontSize="1.2rem" fontWeight="bold" pb={2}>
                Analytics Overview
              </Typography>
              <Grid container>
                <Grid item xs={12} md={7}>
                  <Grid container>
                    {analyticsOverview.map((oneEl, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <AnalyticsCard
                          title={oneEl.tankName}
                          changedRatio="10%"
                          isIncreased={true}
                          currentValue={convertToRupees(oneEl.sales)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md
                  display={"flex"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chart
                    options={{
                      legend: {
                        show: false,
                      },

                      dataLabels: {
                        enabled: true,
                      },
                      labels: analyticsOverview.map((oneEl) => oneEl.tankName),
                      yaxis: {
                        labels: {
                          formatter: function (val) {
                            return convertToRupees(val);
                          },
                        },
                      },
                    }}
                    series={analyticsOverview.map((oneEl) => oneEl.sales)}
                    type="pie"
                    width="100%"
                  />
                </Grid>
              </Grid>
            </ContentCard>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography
            fontSize="1rem"
            fontWeight="bold"
            sx={{
              mb: 1,
            }}
          >
            Overview
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <SalesCard
              title="Total Sales"
              price={
                dealerSalesSummary.lastMonthSales
                  ? convertToRupees(dealerSalesSummary.lastMonthSales)
                  : "Rs 0.00"
              }
              description="Total sales made by dealers in last month"
            />
            <SalesCard
              title="Outstanding"
              price={
                dealerSalesSummary.outstandingAmount
                  ? convertToRupees(dealerSalesSummary.outstandingAmount)
                  : "Rs 0.00"
              }
              description="Total outstanding amount dealers has to pay"
            />
            <SalesCard
              title="New Customers"
              price={
                dealerSalesSummary.totalNewCustomers
                  ? dealerSalesSummary.totalNewCustomers + " customers"
                  : 0 + " customers"
              }
              description="Total new customers added in last month"
            />
            <SalesCard
              title="Returned Tanks"
              price={
                dealerSalesSummary.returnedTankCount
                  ? dealerSalesSummary.returnedTankCount + " tanks"
                  : 0 + " tanks"
              }
              description="Total returned tanks to dealers in last month"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DealerSales;
