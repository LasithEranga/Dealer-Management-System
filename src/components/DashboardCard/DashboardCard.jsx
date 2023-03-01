import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
const DashboardCard = ({ title, content }) => {
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
      <Box sx={{ flexGrow: 3, pl: 2 }}>
        <Box>
          <Typography fontSize={"1.5rem"}>{content}</Typography>
        </Box>
        <Box>{title}</Box>
      </Box>
    </Grid>
  );
};

export default DashboardCard;
