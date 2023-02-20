import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import AnalyticsCard from "../../components/AnalyticsCard/AnalyticsCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import SalesCard from "../../components/SalesCard/SalesCard";

const DealerSales = () => {
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
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
      ],
    },
  };
  const series = [
    {
      name: "Series 1",
      data: [45, 52, 38, 45, 19, 23, 2],
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
                    {[1, 2, 3, 4].map((oneEl) => (
                      <Grid item xs={12} md={6}>
                        <AnalyticsCard
                          title="Total Sales"
                          changedRatio="10%"
                          isIncreased={true}
                          currentValue="Rs 10.52K"
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
                    }}
                    series={[44, 55, 41, 17]}
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
              price="Rs 1,000.00"
              description="Total sales made by dealer in last month"
            />
            <SalesCard
              title="Outstanding"
              price="Rs 1,000.00"
              description="Total outstanding amount dealer has to pay"
            />
            <SalesCard
              title="New Customers"
              price="50 customers"
              description="Total new customers added in last month"
            />
            <SalesCard
              title="Returned Tanks"
              price="50 tanks"
              description="Total returned tanks to dealer in last month"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DealerSales;
