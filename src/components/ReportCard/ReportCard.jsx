import { Report, ReportOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../ContentCard/ContentCard";

const ReportCard = () => {
  return (
    <ContentCard sx={{ width: "10rem", height: "10rem", m: 1 }}>
      <Box
        sx={{
          height: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReportOff
          sx={{
            fontSize: "4.5rem",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            my: 1,
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Purchase Order
        </Typography>
      </Box>
    </ContentCard>
  );
};

export default ReportCard;
