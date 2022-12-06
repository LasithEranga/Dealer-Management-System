import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
const DashboardCard = ({ text }) => {
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
        <Box>
          <Typography fontSize={"1.5rem"}>Rs.12,485.00</Typography>
        </Box>
        <Box>{text}</Box>
      </Box>
    </Grid>
  );
};

export default DashboardCard;
