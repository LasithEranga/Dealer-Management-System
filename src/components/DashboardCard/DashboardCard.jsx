import { Report } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
const DashboardCard = () => {
  return (
    <Grid
      item
      xs
      display={"flex"}
      flexDirection="column"
      sx={{ height: "10rem", backgroundColor: "white", borderRadius: 2, p: 1 }}
    >
      <Box sx={{ p: 2, lineHeight: "0rem" }}>
        <LibraryBooksIcon sx={{ fontSize: "3rem" }} />
      </Box>
      <Box sx={{ flexGrow: 3 }}>
        <Box>Rs.12,485.00</Box>
        <Box>Today Total Income</Box>
      </Box>
    </Grid>
  );
};

export default DashboardCard;
