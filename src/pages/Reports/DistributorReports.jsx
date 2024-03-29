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
import { useNavigate } from "react-router-dom";
import ContentCard from "../../components/ContentCard/ContentCard";
import ReportCard from "../../components/ReportCard/ReportCard";

export const ICON_SIZE = "3rem";
const DistributorReports = () => {
  const navigate = useNavigate();

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
            <TrendingUp
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Sales Report"
          onClick={() => {
            navigate("sales-report");
          }}
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
          onClick={() => {
            navigate("receivables-report");
          }}
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
          onClick={() => {
            navigate("tank-returns-report");
          }}
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
          onClick={() => {
            navigate("stocks-report");
          }}
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
          onClick={() => {
            navigate("dealer-stocks-report");
          }}
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
          onClick={() => {
            navigate("fast-moving-stocks-report");
          }}
        />
        <ReportCard
          icon={
            <Description
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Purchase Orders"
          onClick={() => {
            navigate("purchase-orders-report");
          }}
        />
      </Box>
    </Box>
  );
};

export default DistributorReports;
