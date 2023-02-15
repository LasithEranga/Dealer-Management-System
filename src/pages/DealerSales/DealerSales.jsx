import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
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
          <Box mb={1.5}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Grid container>
                  {[1, 2, 3, 4, 5].map((oneEl) => (
                    <Grid item xs={12} md={6}>
                      {oneEl}
                    </Grid>
                  ))}
                </Grid>
                1
              </Grid>

              <Grid item xs={12} md={6}>
                2
              </Grid>
            </Grid>
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
            <SalesCard />
            <SalesCard />
            <SalesCard />
            <SalesCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DealerSales;
