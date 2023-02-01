import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BarChart from "../../components/BarChart/BarChart";
import ContentCard from "../../components/ContentCard/ContentCard";
import SalesCard from "../../components/SalesCard/SalesCard";

const DealerSales = () => {
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
            <Box
              sx={{
                height: "15.5rem",
                display: "flex",
                justifyContent: "center",
              }}
              mb={1.5}
            >
              <BarChart height={100} />
            </Box>
          </ContentCard>
          <Box mb={1.5}>sdf</Box>
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
