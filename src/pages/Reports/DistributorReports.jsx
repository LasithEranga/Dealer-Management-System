import { Box, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportCard from "../../components/ReportCard/ReportCard";

const DistributorReports = () => {
  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Reports
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <ReportCard />
        <ReportCard />
        <ReportCard />
        <ReportCard />
      </Box>
    </Box>
  );
};

export default DistributorReports;
