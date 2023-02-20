import {
  ArrowCircleDown,
  Description,
  Forward30,
  Groups,
  Inventory,
  KeyboardReturn,
  Report,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportCard from "../../components/ReportCard/ReportCard";

export const ICON_SIZE = "3rem";
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
        <ReportCard
          icon={
            <Description
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Purchase Orders"
          onClick={() => {}}
        />
        <ReportCard
          icon={
            <ArrowCircleDown
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Receivables"
        />

        <ReportCard
          icon={
            <KeyboardReturn
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Tank Returns"
        />

        <ReportCard
          icon={
            <TrendingUp
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Sales Report"
        />
        <ReportCard
          icon={
            <Inventory
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Stocks"
        />
        <ReportCard
          icon={
            <Groups
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Dealer Stocks"
        />
        <ReportCard
          icon={
            <Forward30
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Fast Moving Stocks"
        />
      </Box>
    </Box>
  );
};

export default DistributorReports;
