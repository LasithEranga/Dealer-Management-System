import { Report, ReportOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../ContentCard/ContentCard";

const ReportCard = ({ icon, title, onClick }) => {
  return (
    <ContentCard
      sx={{
        width: "10rem",
        height: "10rem",
        m: 1,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        ":hover": {
          boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          height: "65%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
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
          {title}
        </Typography>
      </Box>
    </ContentCard>
  );
};

export default ReportCard;
