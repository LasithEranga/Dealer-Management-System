import { Box, Grid } from "@mui/material";
import React from "react";
import DashboardCard from "../DashboardCard/DashboardCard";

const Dashboard = () => {
  return (
    <Box mt={2}>
      <Grid container gap={2}>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </Grid>
    </Box>
  );
};

export default Dashboard;
